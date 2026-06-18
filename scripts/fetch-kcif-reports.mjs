import fs from "node:fs/promises";
import path from "node:path";

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
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "maco-adviser-github-actions" },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
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

function extractFocus(detailHtml, kind) {
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
    .split(/\s*(?=ㅁ|- )/g)
    .map((item) => item.replace(/^[ㅁ\-\s]+/, "").trim())
    .filter((item) => item.length >= 20)
    .slice(0, 4);

  return bullets.length ? bullets : [focusText].filter(Boolean).slice(0, 1);
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

  if (/금리|장기금리|국채/.test(text)) {
    advice.push("장기금리 리스크가 부각될 때는 성장주, 리츠, 장기채처럼 듀레이션이 긴 자산의 비중 확대를 서두르지 않는 편이 낫습니다.");
  }
  if (/유가|중동|스태그플레이션|물가/.test(text)) {
    advice.push("유가와 물가 충격이 함께 언급되면 에너지, 원자재, 물가 방어력이 있는 현금흐름 기업을 우선 점검하고 항공·운송·재량소비는 보수적으로 봅니다.");
  }
  if (/신흥국|달러|외환|자본유출/.test(text)) {
    advice.push("신흥국·달러 스트레스가 커질 때는 달러 방어 포지션과 미국 국채의 방어 역할을 같이 봅니다.");
  }
  if (/세계경제|국제ㆍ국내금융시장|글로벌 은행산업|은행산업/.test(text)) {
    advice.push("INSIGHT가 세계경제, 금융시장, 은행산업을 점검축으로 제시할 때는 지수 방향보다 금리·신용·은행 유동성의 동시 악화 여부를 먼저 확인합니다.");
  }
  if (/AI|버블|주식|밸류에이션/.test(text)) {
    advice.push("AI·주식 밸류에이션 리스크가 언급되면 실적 가시성과 현금흐름으로 가격을 방어할 수 있는 종목을 선별합니다.");
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
      report.focus = extractFocus(detailHtml, report.kind);
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
