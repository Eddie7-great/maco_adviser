import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const BASE_URL = "https://www.kcif.or.kr";
const LIST_URL = `${BASE_URL}/annual/monthlyList`;
const targets = [
  { kind: "insight", keyword: "국제금융 INSIGHT", label: "국제금융 INSIGHT" },
  { kind: "riskWatch", keyword: "글로벌 리스크 워치", label: "글로벌 리스크 워치" },
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url) {
  const response = await fetchWithRetry(url);
  return await response.text();
}

async function fetchBuffer(url) {
  const response = await fetchWithRetry(url, { accept: "application/pdf,*/*" });
  return Buffer.from(await response.arrayBuffer());
}

async function fetchWithRetry(url, options = {}) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "Accept": options.accept || "text/html,application/xhtml+xml,*/*",
          "User-Agent": "maco-adviser-github-actions",
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      await wait(750 * attempt);
    }
  }
  throw lastError;
}

function stripHtml(value) {
  return decodeEntities(String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim());
}

function stripHtmlWithBreaks(value) {
  return decodeEntities(String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|strong|li)>/gi, "\n")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim());
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function absoluteUrl(href) {
  return new URL(href.replaceAll("&amp;", "&"), BASE_URL).href;
}

function reportBlocks(listHtml) {
  return listHtml
    .split(/<li>\s*<div class="tit_box">/i)
    .slice(1)
    .map((block) => `<li><div class="tit_box">${block}`);
}

function findLatestReport(listHtml, target) {
  const block = reportBlocks(listHtml).find((item) => stripHtml(item).includes(target.keyword) && item.includes("reportView"));
  if (!block) throw new Error(`Could not find ${target.keyword}`);

  const href = block.match(/<a\s+href="([^"]*reportView[^"]*)"[^>]*>/i)?.[1];
  if (!href) throw new Error(`Could not find link for ${target.keyword}`);
  const title = stripHtml(block.match(/<p[^>]*>\s*([\s\S]*?)\s*<\/p>/i)?.[1] || target.keyword);
  const date = block.match(/\d{4}\.\d{2}\.\d{2}/)?.[0] || "";
  const views = block.match(/조회수\s*<span>([\d,]+)<\/span>/i)?.[1] || "";
  const attachment = stripHtml(
    block.match(/title="([^"]*\.pdf)"/i)?.[1] ||
    block.match(/<li[^>]*>\s*<a[^>]*>([^<]*\.pdf)<\/a>\s*<\/li>/i)?.[1] ||
    "",
  );

  return {
    kind: target.kind,
    label: target.label,
    title,
    date,
    views,
    attachment,
    url: absoluteUrl(href),
    source: "KCIF",
    focus: [],
    implication: defaultImplication(target.kind),
  };
}

function parseQuotedArgs(call) {
  return [...String(call || "").matchAll(/'((?:\\'|[^'])*)'/g)].map((match) => match[1].replace(/\\'/g, "'"));
}

function extractAttachmentInfo(detailHtml) {
  const previewCall = detailHtml.match(/filePreview\(([^)]*)\)/)?.[0] || "";
  const previewArgs = parseQuotedArgs(previewCall);
  const downloadCall = detailHtml.match(/reportdownload\(([^)]*)\)/)?.[0] || "";
  const downloadArgs = parseQuotedArgs(downloadCall);
  const fno = previewArgs[4] || downloadArgs[0] || "";
  if (!fno) return null;

  return {
    fpath: previewArgs[0] || "",
    fname: previewArgs[1] || "",
    ftype: previewArgs[2] || "pdf",
    svname: previewArgs[3] || "",
    fno,
    downloadUrl: `${BASE_URL}/common/file/reportFileDownload?atch_no=${fno}&lang=KR`,
    previewUrl: previewArgs.length >= 4
      ? `${BASE_URL}/flexer/view.jsp?SDir=${previewArgs[0]}&SName=${previewArgs[1]}&ftype=${previewArgs[2]}&FileName=${encodeURIComponent(previewArgs[3])}`
      : "",
  };
}

async function extractPdfTextFromAttachment(attachment) {
  if (!attachment?.downloadUrl) return "";
  const pdfBuffer = await fetchBuffer(attachment.downloadUrl);
  if (pdfBuffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    throw new Error("KCIF attachment response was not a PDF");
  }

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "kcif-pdf-"));
  const pdfPath = path.join(tempDir, "report.pdf");
  try {
    await fs.writeFile(pdfPath, pdfBuffer);
    return cleanPdfText(await extractPdfText(pdfPath));
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function extractPdfText(pdfPath) {
  const pdftotext = process.env.PDFTOTEXT_BIN || "pdftotext";
  try {
    const { stdout } = await execFileAsync(pdftotext, ["-layout", "-enc", "UTF-8", pdfPath, "-"], {
      maxBuffer: 40 * 1024 * 1024,
      timeout: 120000,
      windowsHide: true,
    });
    if (stdout.trim()) return stdout;
  } catch {
    // Fall back to Python below. GitHub Actions installs poppler, local runs may use bundled Python.
  }

  const pythonCandidates = [process.env.PYTHON_BIN, "python3", "python"].filter(Boolean);
  const code = [
    "from pypdf import PdfReader",
    "import sys",
    "reader = PdfReader(sys.argv[1])",
    "sys.stdout.write('\\n'.join((page.extract_text() or '') for page in reader.pages))",
  ].join("; ");

  let lastError;
  for (const python of pythonCandidates) {
    try {
      const { stdout } = await execFileAsync(python, ["-c", code, pdfPath], {
        env: { ...process.env, PYTHONIOENCODING: "utf-8" },
        maxBuffer: 40 * 1024 * 1024,
        timeout: 180000,
        windowsHide: true,
      });
      if (stdout.trim()) return stdout;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Could not extract PDF text");
}

function cleanPdfText(text) {
  return String(text || "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*○+\s*/g, " ")
    .replace(/\s*[-–—]{1,2}\s*/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractFocus(detailHtml, kind, pdfText = "") {
  if (pdfText.length > 1000) {
    const pdfFocus = extractPdfFocus(pdfText, kind);
    if (pdfFocus.length) return pdfFocus;
  }

  const contentHtml = detailHtml.match(/<div class="cont_area[^"]*">([\s\S]*?)<\/div>\s*<div class="btn_wrap">/i)?.[1] || detailHtml;
  const bodyText = stripHtml(contentHtml);
  const focusStart = bodyText.indexOf("Monthly Focus");
  if (focusStart < 0) return extractStructuredSections(contentHtml, kind);

  const tail = bodyText.slice(focusStart + "Monthly Focus".length);
  const endMarkers = ["목록", "작성자", "이전 다음", "최근 발간 보고서"];
  const endIndex = endMarkers
    .map((marker) => tail.indexOf(marker))
    .filter((index) => index > 0)
    .sort((a, b) => a - b)[0] || Math.min(tail.length, 1400);
  const focusText = tail.slice(0, endIndex).replace(/\s+/g, " ").trim();

  const bullets = focusText
    .split(/\s*(?=ㆍ|- )/g)
    .map((item) => item.replace(/^[ㆍ\-\s]+/, "").trim())
    .filter((item) => item.length >= 20)
    .slice(0, 4);

  return bullets.length ? bullets : [focusText].filter(Boolean).slice(0, 1);
}

function extractPdfFocus(text, kind) {
  if (kind === "riskWatch") return extractRiskWatchFocus(text);
  return extractInsightFocus(text);
}

function extractInsightFocus(text) {
  const focus = [];
  const world = [];
  if (has(text, /AI|반도체/)) world.push("AI·반도체 수요와 재정 확대가 성장 하방을 일부 완충");
  if (has(text, /중동|유가|공급충격|인플레이션|물가/)) world.push("중동 리스크와 공급 충격은 물가 경계를 높임");
  if (has(text, /중국|내수|수출/)) world.push("중국은 내수 부진과 수출 방어를 함께 점검");
  if (world.length) focus.push(`세계경제: ${world.join(", ")}하는 흐름으로 해석됩니다.`);

  const markets = [];
  if (has(text, /연준|정책금리|동결|인상/)) markets.push("연준의 금리 경로가 인플레이션 상방 위험에 민감하다는 점");
  if (has(text, /국채|장기금리|금리|채권/)) markets.push("장기금리와 국채 수급이 밸류에이션 부담 요인이라는 점");
  if (has(text, /달러|환율|외환/)) markets.push("달러와 외환 변동성도 위험 선호를 좌우한다는 점");
  if (markets.length) focus.push(`국제·국내금융시장: ${markets.join(", ")}을 핵심 변수로 봅니다.`);

  const banking = [];
  if (has(text, /은행|은행산업|대출|예금|NIM|순이자|건전성|부실|상업용 부동산/)) {
    banking.push("금리·신용 여건이 은행 수익성과 건전성에 미치는 영향을 함께 확인");
  }
  if (has(text, /유동성|자본|충당금|연체/)) banking.push("유동성, 자본비율, 연체 흐름을 신용 리스크의 선행 단서로 확인");
  if (banking.length) focus.push(`글로벌 은행산업: ${banking.join("하고, ")}해야 하는 구간입니다.`);

  const view = [];
  if (has(text, /리스크 워치|중동|유가|스태그플레이션/)) view.push("유가·물가 충격이 성장 둔화와 결합하는지");
  if (has(text, /AI|밸류에이션|주식|버블/)) view.push("AI·주식 밸류에이션이 실적 개선으로 정당화되는지");
  if (has(text, /신흥국|달러|외환|자본유출/)) view.push("신흥국·달러 스트레스가 커지는지");
  if (view.length) focus.push(`투자 체크: ${view.join(", ")}를 FRED 지표와 교차 확인합니다.`);

  return focus.slice(0, 4);
}

function extractRiskWatchFocus(text) {
  const focus = [];
  if (has(text, /장기금리|국채|금리|선진국/)) {
    focus.push("글로벌 금리: 선진국 장기금리 고수준은 주식 밸류에이션과 장기채 가격에 동시에 부담을 줄 수 있습니다.");
  }
  if (has(text, /중동|유가|원유|스태그플레이션|물가/)) {
    focus.push("유가·물가: 중동 리스크와 원유 가격 충격은 물가 재가속과 성장 둔화가 겹치는 시나리오를 키웁니다.");
  }
  if (has(text, /신흥국|달러|외환|자본유출|서유럽/)) {
    focus.push("취약 지역: 신흥국, 원유 의존도가 높은 국가, 달러 조달 부담이 큰 자산은 방어적으로 점검해야 합니다.");
  }
  if (has(text, /AI|주식|밸류에이션|버블|반도체/)) {
    focus.push("위험자산: AI·반도체 기대가 높은 구간에서는 실적 확인 전 밸류에이션 과열 여부를 함께 봅니다.");
  }
  return focus.slice(0, 4);
}

function has(text, pattern) {
  return pattern.test(text);
}

function extractStructuredSections(contentHtml, kind) {
  const text = stripHtmlWithBreaks(contentHtml)
    .replace(/\s*ㅁ\s*/g, "\nㅁ ")
    .replace(/\s*ㅇ\s*/g, "\nㅇ ");
  const sections = [];
  let current = null;

  for (const rawLine of text.split(/\n+/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("ㅁ ")) {
      const title = line.replace(/^ㅁ\s*/, "").trim();
      if (/최근 발간 보고서 목록/.test(title)) continue;
      current = { title, items: [] };
      sections.push(current);
      continue;
    }
    if (line.startsWith("ㅇ ") && current) {
      current.items.push(line.replace(/^ㅇ\s*/, "").trim());
    }
  }

  const summaries = sections
    .map((section) => section.items.length ? `${section.title}: ${section.items.join(", ")}` : section.title)
    .filter((item) => item.length >= 3)
    .slice(0, kind === "insight" ? 4 : 3);

  return summaries.length ? summaries : [stripHtml(contentHtml)].filter(Boolean).slice(0, 1);
}

function defaultImplication(kind) {
  if (kind === "riskWatch") {
    return "KCIF의 리스크 워치는 FRED 지표가 포착하지 못하는 지정학, 유가, 글로벌 금리, 신용 이벤트를 보완합니다.";
  }
  return "국제금융 INSIGHT는 미국 지표 중심의 FRED 판단에 글로벌 자금흐름과 정책 해석을 덧붙이는 보조 자료입니다.";
}

function buildAdvice(reports) {
  const text = reports.flatMap((report) => report.focus).join(" ");
  const advice = [];

  if (/금리|장기금리|국채|정책금리/.test(text)) {
    advice.push("장기금리 리스크가 부각될 때는 성장주, 리츠, 장기채처럼 듀레이션이 긴 자산의 비중 확대를 서두르지 않는 편이 낫습니다.");
  }
  if (/유가|중동|스태그플레이션|물가|인플레이션/.test(text)) {
    advice.push("유가와 물가 충격이 함께 언급되면 에너지, 원자재, 물가 방어력이 있는 현금흐름 기업을 우선 점검하고 항공·운송·재량소비는 보수적으로 봅니다.");
  }
  if (/신흥국|달러|외환|자본유출|취약 지역/.test(text)) {
    advice.push("신흥국·달러 스트레스가 커질 때는 달러 방어 포지션과 미국 국채의 방어 역할을 같이 봅니다.");
  }
  if (/세계경제|금융시장|은행산업|은행 유동성|글로벌 은행/.test(text)) {
    advice.push("INSIGHT 전문이 세계경제, 금융시장, 은행산업을 함께 다룰 때는 지수 방향보다 금리·신용·은행 유동성의 동시 악화 여부를 먼저 확인합니다.");
  }
  if (/AI|반도체|주식|밸류에이션|버블/.test(text)) {
    advice.push("AI·반도체 기대가 높게 반영된 구간에서는 실적 가시성과 현금흐름으로 가격을 방어할 수 있는 종목을 선별합니다.");
  }

  if (!advice.length) {
    advice.push("KCIF 월간보고서는 FRED의 계량 신호에 이벤트 리스크를 더하는 보조 레이어로 보고, 투자 비중 조절보다 리스크 체크리스트 갱신에 우선 활용합니다.");
  }
  return advice;
}

async function main() {
  const listHtml = await fetchText(LIST_URL);
  const reports = [];

  for (const target of targets) {
    const report = findLatestReport(listHtml, target);
    try {
      const detailHtml = await fetchText(report.url);
      const attachment = extractAttachmentInfo(detailHtml);
      report.previewUrl = attachment?.previewUrl || "";
      report.summarySource = "PDF 미리보기 전문";
      try {
        const pdfText = await extractPdfTextFromAttachment(attachment);
        report.pdfTextLength = pdfText.length;
        report.focus = extractFocus(detailHtml, report.kind, pdfText);
      } catch (error) {
        report.summarySource = "상세 페이지 본문";
        report.pdfError = String(error.message || error);
        report.focus = extractFocus(detailHtml, report.kind);
      }
    } catch (error) {
      report.error = String(error.message || error);
    }
    reports.push(report);
    await wait(350);
  }

  const output = {
    generatedAt: new Date().toISOString(),
    source: "KCIF",
    listUrl: LIST_URL,
    reports,
    advice: buildAdvice(reports),
  };

  await fs.mkdir("data", { recursive: true });
  await fs.writeFile(path.join("data", "kcif-reports.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`wrote data/kcif-reports.json (${reports.length} reports)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
