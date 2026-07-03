import fs from "node:fs/promises";
import path from "node:path";

const FEED_URL = "https://www.federalreserve.gov/feeds/speeches.xml";
const FED_BASE_URL = "https://www.federalreserve.gov";
const MAX_ITEMS_TO_READ = 12;
const MAX_SPEECHES_TO_KEEP = 6;

const speakerDirectory = {
  Barr: "Michael S. Barr",
  Bowman: "Michelle W. Bowman",
  Cook: "Lisa D. Cook",
  Jefferson: "Philip N. Jefferson",
  Kugler: "Adriana D. Kugler",
  Logan: "Lorie K. Logan",
  Powell: "Jerome H. Powell",
  Schmid: "Jeffrey R. Schmid",
  Waller: "Christopher J. Waller",
  Williams: "John C. Williams",
};

const themeRules = [
  {
    key: "monetaryPolicy",
    label: "금리·통화정책",
    score: 5,
    regex: /\b(monetary policy|policy rate|fomc|inflation|employment|labor market|dual mandate|stable prices|rate cut|rate cuts|rate increase|restrictive|easing|tightening)\b/i,
  },
  {
    key: "dollarLiquidity",
    label: "달러·유동성",
    score: 5,
    regex: /\b(u\.s\. dollar|dollar|reserve currency|liquidity|treasury market|funding market|global financial|swap line|payment system)\b/i,
  },
  {
    key: "creditBanking",
    label: "신용·은행",
    score: 4,
    regex: /\b(credit|bank|banking|capital|leverage|financial stability|supervision|regulation|deregulat|stress|lending|small business credit)\b/i,
  },
  {
    key: "growthConsumer",
    label: "성장·소비",
    score: 3,
    regex: /\b(small business|growth|productivity|consumer|household|jobs|employment|economy|economic activity)\b/i,
  },
  {
    key: "aiProductivity",
    label: "AI·생산성",
    score: 3,
    regex: /\b(artificial intelligence|AI|productivity|technology|tokenization|digital assets|innovation)\b/i,
  },
  {
    key: "risk",
    label: "시장 리스크",
    score: 3,
    regex: /\b(risk|uncertainty|volatility|boom|financial health|fraud|resilience|vulnerabilities)\b/i,
  },
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "Accept": "text/html,application/xhtml+xml,application/xml,text/xml,*/*",
          "User-Agent": "maco-adviser-github-actions",
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      await wait(700 * attempt);
    }
  }
  throw lastError;
}

function parseRssItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map((match) => {
      const block = match[1];
      const rawTitle = readTag(block, "title");
      const { speaker, title } = splitTitle(rawTitle);
      const pubDate = readTag(block, "pubDate");
      const publishedAt = toIsoDate(pubDate);
      return {
        speaker,
        speakerFullName: speakerDirectory[speaker] || speaker,
        title,
        rawTitle,
        url: absoluteUrl(readTag(block, "link")),
        description: readTag(block, "description"),
        publishedAt,
        date: shortIsoDate(publishedAt),
        source: "Federal Reserve",
      };
    })
    .filter((item) => item.title && item.url);
}

function readTag(block, tagName) {
  const value = block.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"))?.[1] || "";
  return cleanText(stripCdata(value));
}

function stripCdata(value) {
  return String(value || "").replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}

function splitTitle(rawTitle) {
  const parts = String(rawTitle || "").split(/,\s+/);
  if (parts.length < 2) return { speaker: "Federal Reserve", title: rawTitle || "Speech" };
  return { speaker: parts[0], title: parts.slice(1).join(", ") };
}

function absoluteUrl(url) {
  try {
    return new URL(url, FED_BASE_URL).href;
  } catch {
    return FEED_URL;
  }
}

function toIsoDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? new Date().toISOString() : date.toISOString();
}

function shortIsoDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "" : date.toISOString().slice(0, 10);
}

function cleanText(value) {
  return decodeEntities(String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h1|h2|h3)>/gi, "\n")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim());
}

function decodeEntities(value) {
  return String(value || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&iacute;/g, "í")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function extractSpeechBody(html) {
  const candidates = [
    html.match(/<div[^>]+class="[^"]*col-xs-12\s+col-sm-8\s+col-md-8[^"]*"[^>]*>([\s\S]*?)<div[^>]+class="[^"]*col-xs-12\s+col-sm-4\s+col-md-4/i)?.[1],
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1],
    html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1],
  ].filter(Boolean);
  const section = candidates[0] || html;
  const withoutFootnotes = section.split(/<hr[^>]*>/i)[0];
  return cleanText(withoutFootnotes
    .replace(/<div[^>]+class="[^"]*embed-responsive[\s\S]*?<\/script>\s*/gi, " ")
    .replace(/<sup[\s\S]*?<\/sup>/gi, " "));
}

function textForAnalysis(item, bodyText) {
  return `${item.title} ${item.description} ${bodyText}`.replace(/\s+/g, " ");
}

function analyzeSpeech(item, bodyText, error = null) {
  const text = textForAnalysis(item, bodyText);
  const themes = themeRules.filter((rule) => rule.regex.test(text));
  const relevanceScore = themes.reduce((sum, rule) => sum + rule.score, 0) + recencyBoost(item.publishedAt);
  const themeKeys = themes.map((theme) => theme.key);
  const marketImpact = marketImpactFor(item.title, themeKeys, text);
  return {
    ...item,
    venue: item.description.replace(/^Speech\s+At\s+/i, "").replace(/^Speech\s+/i, ""),
    themes: themes.map((theme) => theme.label),
    stance: stanceFor(item.title, themeKeys, text),
    marketImpact,
    summary: summaryFor(item.title, themeKeys, text),
    watch: watchFor(themeKeys, text),
    relevanceScore,
    sourceUrl: item.url,
    readError: error,
  };
}

function recencyBoost(publishedAt) {
  const ageDays = (Date.now() - new Date(publishedAt).getTime()) / 86400000;
  if (!Number.isFinite(ageDays)) return 0;
  if (ageDays <= 7) return 3;
  if (ageDays <= 30) return 2;
  if (ageDays <= 60) return 1;
  return 0;
}

function hasAny(keys, targets) {
  return targets.some((target) => keys.includes(target));
}

function summaryFor(title, keys, text) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("global economic developments")) {
    return "글로벌 경제 흐름과 미국 경기의 연결고리를 다룬 발언입니다. 달러, 수출주, 경기민감 업종의 외부 수요 리스크를 점검할 단서입니다.";
  }
  if (lowerTitle.includes("corporate lending") || lowerTitle.includes("regulation reshapes markets")) {
    return "기업대출이 은행권 밖으로 이동하는 문제를 다룬 발언입니다. 은행주, 사모신용, 하이일드·레버리지 기업의 신용 여건을 점검합니다.";
  }
  if (lowerTitle.includes("dollar") || keys.includes("dollarLiquidity")) {
    return "달러의 국제적 역할과 결제·유동성 기반을 다룬 발언입니다. 달러 강세, 미국 국채 수요, 글로벌 위험회피를 함께 볼 필요가 있습니다.";
  }
  if (lowerTitle.includes("deregulat") || /financial boom/i.test(text)) {
    return "금융 호황기에 규제 완화가 신용·레버리지 위험을 키울 수 있다는 경계 신호입니다. 은행주와 크레딧 민감 자산을 보수적으로 점검합니다.";
  }
  if (hasAny(keys, ["monetaryPolicy"])) {
    return "정책금리, 물가, 고용 균형에 관한 발언입니다. 성장주 밸류에이션과 장기채·리츠 같은 금리 민감 자산의 방향성 판단에 직접적입니다.";
  }
  if (hasAny(keys, ["aiProductivity"])) {
    return "AI와 생산성, 금융시스템 변화를 함께 짚은 발언입니다. 반도체·소프트웨어 성장성은 우호적이나 밸류에이션 과열은 별도 점검이 필요합니다.";
  }
  if (hasAny(keys, ["creditBanking"])) {
    return "신용 접근성과 은행·대출 환경을 다룬 발언입니다. 소형주, 금융주, 하이일드 채권의 자금조달 스트레스 판단에 참고됩니다.";
  }
  if (hasAny(keys, ["growthConsumer"])) {
    return "고용·소비·기업 활동을 통해 미국 내수의 체력을 확인할 수 있는 발언입니다. 경기민감 업종의 실적 기대를 점검할 단서입니다.";
  }
  return "시장에 직접적인 정책 신호는 제한적이지만, 연준이 주목하는 경제·금융 의제를 확인하는 보조 자료입니다.";
}

function marketImpactFor(title, keys, text) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("corporate lending") || lowerTitle.includes("regulation reshapes markets")) return "은행·사모신용·하이일드·레버리지 기업의 신용 여건 점검";
  if (lowerTitle.includes("global economic developments")) return "달러, 수출주, 경기민감 업종의 글로벌 수요와 금리 충격 점검";
  if (keys.includes("monetaryPolicy")) return "금리 민감 성장주·장기채·리츠의 할인율을 재점검";
  if (keys.includes("dollarLiquidity")) return "달러, 미국 국채, 신흥국·원자재 자산의 위험회피 흐름 점검";
  if (keys.includes("creditBanking") && /deregulat|boom|leverage|stress/i.test(`${title} ${text}`)) return "은행·하이일드·레버리지 기업에는 리스크 점검 신호";
  if (keys.includes("creditBanking")) return "소형주·금융주·하이일드 채권의 자금조달 여건 확인";
  if (keys.includes("aiProductivity")) return "AI 인프라·소프트웨어 성장성은 우호, 고평가 구간은 선별";
  if (keys.includes("growthConsumer")) return "소비재·산업재·중소형 경기민감 업종의 수요 체력 확인";
  return "직접 영향은 낮아 FRED 지표와 함께 보조적으로 확인";
}

function stanceFor(title, keys, text) {
  const combined = `${title} ${text}`;
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("global economic developments")) return "글로벌 경기 점검";
  if (lowerTitle.includes("corporate lending") || lowerTitle.includes("regulation reshapes markets")) return "신용 여건 점검";
  if (/deregulat|financial boom|leverage|stress|vulnerabilities/i.test(combined)) return "금융안정 경계";
  if (keys.includes("dollarLiquidity")) return "달러·유동성 점검";
  if (/monetary policy|policy decision|restrictive|inflation|stable prices|policy risks/i.test(combined) && keys.includes("monetaryPolicy")) return "정책 경계";
  if (/rate cut|easing|downside|weaken/i.test(combined) && keys.includes("monetaryPolicy")) return "완화 기대 점검";
  if (keys.includes("aiProductivity")) return "구조 성장";
  if (keys.includes("creditBanking")) return "신용 여건 점검";
  return "참고";
}

function watchFor(keys, text) {
  const watches = [];
  if (keys.includes("monetaryPolicy")) watches.push("CPI·PCE와 10년물 금리");
  if (keys.includes("dollarLiquidity")) watches.push("달러지수와 미국 국채 수요");
  if (keys.includes("creditBanking")) watches.push("하이일드 OAS와 은행 대출태도");
  if (keys.includes("aiProductivity")) watches.push("AI 투자 사이클과 생산성 지표");
  if (keys.includes("growthConsumer")) watches.push("소매판매·고용·소기업 신용");
  if (/oil|energy|geopolitical/i.test(text)) watches.push("유가와 지정학 리스크");
  return watches.length ? unique(watches).join(", ") : "원문 제목과 FRED 지표의 방향성";
}

function buildAdvice(speeches) {
  const keys = new Set(speeches.flatMap((speech) => speech.themes || []));
  const advice = [];
  if (keys.has("금리·통화정책")) {
    advice.push("연준 발언에서 금리·물가가 반복되면 성장주 비중 확대는 CPI/PCE 둔화와 10년물 금리 하락이 같이 확인될 때가 더 안전합니다.");
  }
  if (keys.has("달러·유동성")) {
    advice.push("달러·유동성 언급이 늘면 신흥국, 원자재, 고베타 자산보다 달러와 미국 국채의 방어력을 함께 비교합니다.");
  }
  if (keys.has("신용·은행")) {
    advice.push("신용·은행 관련 발언은 하이일드 OAS, 은행주, 소형주의 자금조달 리스크를 재점검하라는 신호로 봅니다.");
  }
  if (keys.has("AI·생산성")) {
    advice.push("AI·생산성 발언은 장기 성장 테마에 우호적이지만, 금리가 높을 때는 실적이 확인되는 기업 중심으로 압축하는 편이 낫습니다.");
  }
  if (!advice.length) {
    advice.push("최근 연준 발언의 시장 직접성은 낮습니다. FRED 금리·물가·신용 지표를 우선하고 발언은 정책 의제 확인용으로 보세요.");
  }
  return advice.slice(0, 4);
}

function unique(list) {
  return [...new Set(list.filter(Boolean))];
}

async function main() {
  const feedXml = await fetchText(FEED_URL);
  const rssItems = parseRssItems(feedXml).slice(0, MAX_ITEMS_TO_READ);
  const analyzed = [];

  for (const item of rssItems) {
    let bodyText = "";
    let error = null;
    try {
      bodyText = extractSpeechBody(await fetchText(item.url));
    } catch (fetchError) {
      error = String(fetchError.message || fetchError);
    }
    analyzed.push(analyzeSpeech(item, bodyText, error));
    await wait(250);
  }

  const relevant = analyzed
    .filter((speech) => speech.relevanceScore >= 5)
    .sort((a, b) => b.relevanceScore - a.relevanceScore || new Date(b.publishedAt) - new Date(a.publishedAt));
  const speeches = (relevant.length ? relevant : analyzed)
    .slice(0, MAX_SPEECHES_TO_KEEP)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const output = {
    generatedAt: new Date().toISOString(),
    source: "Federal Reserve",
    feedUrl: FEED_URL,
    speeches,
    advice: buildAdvice(speeches),
  };

  await fs.mkdir("data", { recursive: true });
  await fs.writeFile(path.join("data", "fed-speeches.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`wrote data/fed-speeches.json (${speeches.length} speeches)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
