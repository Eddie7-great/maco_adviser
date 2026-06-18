const fallbackData = {
  generatedAt: "2026-06-18T00:00:00.000Z",
  source: "snapshot",
  series: {
    FEDFUNDS: item("FEDFUNDS", "rates", "연방기금 실효금리", "%", [["2026-01", 3.64], ["2026-02", 3.64], ["2026-03", 3.64], ["2026-04", 3.64], ["2026-05", 3.63]], "기준금리 레벨이 높을수록 주식의 할인율 부담이 커집니다."),
    DGS10: item("DGS10", "rates", "미국 10년물 국채금리", "%", [["2026-06-10", 4.55], ["2026-06-11", 4.45], ["2026-06-12", 4.48], ["2026-06-15", 4.47], ["2026-06-16", 4.43]], "장기금리는 성장주와 주택 관련주의 밸류에이션에 직접 영향을 줍니다."),
    T10Y2Y: item("T10Y2Y", "rates", "10년-2년 금리차", "%p", [["2026-06-11", 0.4], ["2026-06-12", 0.39], ["2026-06-15", 0.4], ["2026-06-16", 0.38], ["2026-06-17", 0.29]], "금리차가 낮거나 재역전되면 경기 둔화 우려가 커집니다."),
    CPIAUCSL: item("CPIAUCSL", "inflation", "소비자물가지수", "index", [["2026-01", 326.588], ["2026-02", 327.46], ["2026-03", 330.293], ["2026-04", 332.407], ["2026-05", 333.979]], "물가가 다시 빨라지면 금리 인하 기대와 밸류에이션에 부담입니다."),
    PCEPI: item("PCEPI", "inflation", "PCE 물가지수", "index", [["2025-12", 128.576], ["2026-01", 129.002], ["2026-02", 129.52], ["2026-03", 130.381], ["2026-04", 130.902]], "연준이 선호하는 물가지표라 통화정책 기대에 민감합니다."),
    UNRATE: item("UNRATE", "labor", "실업률", "%", [["2026-01", 4.3], ["2026-02", 4.4], ["2026-03", 4.3], ["2026-04", 4.3], ["2026-05", 4.3]], "급격한 상승은 침체 위험 신호이고, 안정은 소비와 이익 전망에 우호적입니다."),
    PAYEMS: item("PAYEMS", "labor", "비농업 고용", "천명", [["2026-01", 158592], ["2026-02", 158436], ["2026-03", 158650], ["2026-04", 158829], ["2026-05", 159001]], "고용 총량이 늘면 소비 여력이 유지됩니다. 둔화 속도가 핵심입니다."),
    GDPC1: item("GDPC1", "growth", "실질 GDP", "십억 달러", [["2025-Q1", 23548.21], ["2025-Q2", 23770.976], ["2025-Q3", 24026.834], ["2025-Q4", 24055.749], ["2026-Q1", 24152.656]], "실질 생산이 늘면 기업 이익 전망에 기본적으로 우호적입니다."),
    INDPRO: item("INDPRO", "growth", "산업생산", "index", [["2026-01", 101.1235], ["2026-02", 101.9493], ["2026-03", 101.6273], ["2026-04", 102.509], ["2026-05", 102.6475]], "제조와 광공업 활동은 경기민감 업종을 볼 때 중요한 선행 단서입니다."),
    RSAFS: item("RSAFS", "consumer", "소매판매", "백만 달러", [["2026-01", 734503], ["2026-02", 741278], ["2026-03", 754013], ["2026-04", 757036], ["2026-05", 763705]], "명목 소비 흐름입니다. 물가 영향을 빼고 실질 구매력도 함께 봐야 합니다."),
    UMCSENT: item("UMCSENT", "consumer", "미시간대 소비심리", "index", [["2025-12", 52.9], ["2026-01", 56.4], ["2026-02", 56.6], ["2026-03", 53.3], ["2026-04", 49.8]], "소비심리는 재량소비주와 경기 체감에 민감한 경고등입니다."),
    HOUST: item("HOUST", "consumer", "주택착공", "천호", [["2026-01", 1385], ["2026-02", 1346], ["2026-03", 1522], ["2026-04", 1392], ["2026-05", 1177]], "금리 부담과 건설 경기 변화를 빠르게 보여주는 민감 지표입니다."),
    M2SL: item("M2SL", "risk", "M2 통화량", "십억 달러", [["2025-12", 22353.5], ["2026-01", 22429.3], ["2026-02", 22627], ["2026-03", 22686.4], ["2026-04", 22804.5]], "유동성 총량이 늘면 위험자산에 완충 역할을 할 수 있습니다."),
    MORTGAGE30US: item("MORTGAGE30US", "rates", "30년 고정 모기지", "%", [["2026-05-14", 6.36], ["2026-05-21", 6.51], ["2026-05-28", 6.53], ["2026-06-04", 6.48], ["2026-06-11", 6.52]], "모기지 금리는 주택 수요와 건설 관련주를 압박하거나 완화합니다."),
    BAMLH0A0HYM2: item("BAMLH0A0HYM2", "risk", "하이일드 OAS", "%", [["2026-06-10", 2.8], ["2026-06-11", 2.78], ["2026-06-12", 2.71], ["2026-06-15", 2.66], ["2026-06-16", 2.71]], "신용 스프레드 급등은 위험자산 회피와 경기 스트레스를 뜻합니다."),
  },
};

const groupNames = {
  rates: "금리",
  inflation: "물가",
  labor: "고용",
  growth: "성장",
  consumer: "소비/주택",
  risk: "유동성/신용",
};

const chartSets = [
  { title: "금리와 경기 압력", ids: "FEDFUNDS,DGS10,T10Y2Y", label: "FEDFUNDS · DGS10 · T10Y2Y" },
  { title: "물가 추세", ids: "CPIAUCSL,PCEPI", label: "CPIAUCSL · PCEPI" },
  { title: "고용과 성장", ids: "UNRATE,PAYEMS,GDPC1", label: "UNRATE · PAYEMS · GDPC1" },
  { title: "소비·주택·신용", ids: "RSAFS,HOUST,UMCSENT,BAMLH0A0HYM2", label: "RSAFS · HOUST · UMCSENT · HY OAS" },
];

let macroData = fallbackData;
let indicators = Object.values(fallbackData.series);
let activeFilter = "all";

function item(id, group, name, unit, observations, note) {
  return {
    id,
    group,
    name,
    unit,
    note,
    observations: observations.map(([date, value]) => ({ date, value })),
    latestDate: observations.at(-1)[0],
    latestValue: observations.at(-1)[1],
    fresh: false,
  };
}

async function loadData() {
  try {
    const response = await fetch(`data/fred-data.json?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    macroData = normalizeData(json);
    indicators = Object.values(macroData.series);
    setText("dataFreshness", `FRED JSON 갱신: ${formatDateTime(new Date(macroData.generatedAt))}`);
  } catch {
    macroData = fallbackData;
    indicators = Object.values(fallbackData.series);
    setText("dataFreshness", "FRED JSON 로드 실패 · 내장 스냅샷 사용");
  }
  renderAll();
}

function normalizeData(data) {
  const normalized = { ...data, series: {} };
  Object.entries(fallbackData.series).forEach(([id, fallback]) => {
    const current = data.series?.[id] || fallback;
    const observations = (current.observations?.length ? current.observations : fallback.observations).map((row) => ({
      date: row.date,
      value: Number(row.value),
    })).filter((row) => Number.isFinite(row.value)).slice(-5);
    normalized.series[id] = {
      ...fallback,
      ...current,
      observations,
      latestDate: observations.at(-1)?.date || fallback.latestDate,
      latestValue: observations.at(-1)?.value ?? fallback.latestValue,
      fresh: Boolean(current.fresh),
    };
  });
  return normalized;
}

function buildMacroView() {
  const latest = Object.fromEntries(indicators.map((entry) => [entry.id, entry.latestValue]));
  const rates = scoreBucket([
    latest.DGS10 >= 4.25 ? -2 : latest.DGS10 >= 3.75 ? -1 : 1,
    latest.MORTGAGE30US >= 6.5 ? -2 : latest.MORTGAGE30US >= 5.75 ? -1 : 1,
    latest.T10Y2Y < 0 ? -2 : latest.T10Y2Y < 0.35 ? -1 : 1,
  ]);
  const inflation = scoreBucket([trend("CPIAUCSL") > 0 ? -1 : 1, trend("PCEPI") > 0 ? -1 : 1]);
  const labor = scoreBucket([latest.UNRATE >= 4.8 ? -2 : latest.UNRATE >= 4.4 ? -1 : 1, trend("PAYEMS") < 0 ? -2 : 1]);
  const growth = scoreBucket([trend("GDPC1") < 0 ? -2 : 1, trend("INDPRO") < 0 ? -1 : 1]);
  const consumer = scoreBucket([trend("RSAFS") < 0 ? -1 : 1, trend("UMCSENT") < 0 ? -1 : 1, trend("HOUST") < 0 ? -1 : 1]);
  const risk = scoreBucket([latest.BAMLH0A0HYM2 >= 4 ? -2 : latest.BAMLH0A0HYM2 >= 3.25 ? -1 : 1, trend("M2SL") < 0 ? -1 : 1]);
  const total = rates.score + inflation.score + labor.score + growth.score + consumer.score + risk.score;
  const freshRatio = indicators.filter((entry) => entry.fresh).length / indicators.length;
  return {
    latest,
    total,
    regime: total >= 3 ? "확장 우위" : total <= -3 ? "방어 우위" : "혼재 / 선별",
    confidenceText: freshRatio >= 0.85 ? "신뢰도 높음" : freshRatio >= 0.5 ? "신뢰도 보통" : "스냅샷 보조",
    buckets: { rates, inflation, labor, growth, consumer, risk },
    freshRatio,
  };
}

function scoreBucket(scores) {
  const score = scores.reduce((sum, value) => sum + value, 0);
  return { score, label: score >= 2 ? "우호" : score <= -2 ? "부담" : "중립" };
}

function renderMacroJudgement() {
  const view = buildMacroView();
  const freshIds = indicators.filter((entry) => entry.fresh).map((entry) => entry.id);
  setText("cycleLabel", `${view.regime} · ${view.confidenceText}`);
  setText("cycleSummary", [
    `금리 ${view.buckets.rates.label}, 물가 ${view.buckets.inflation.label}, 고용 ${view.buckets.labor.label}, 성장 ${view.buckets.growth.label}, 소비 ${view.buckets.consumer.label}, 신용 ${view.buckets.risk.label}로 평가됩니다.`,
    freshIds.length ? `최신 갱신 지표: ${freshIds.join(", ")}.` : "아직 Actions 갱신 전이라 스냅샷 기준입니다.",
  ].join(" "));
}

function renderScores() {
  const view = buildMacroView();
  const scoreItems = [
    ["금리", view.buckets.rates.label, `10년물 ${fmt(view.latest.DGS10, "%")}, 모기지 ${fmt(view.latest.MORTGAGE30US, "%")}`],
    ["물가", view.buckets.inflation.label, `CPI ${directionText(values("CPIAUCSL"))}, PCE ${directionText(values("PCEPI"))}`],
    ["고용", view.buckets.labor.label, `실업률 ${fmt(view.latest.UNRATE, "%")}, 고용 ${directionText(values("PAYEMS"))}`],
    ["신용/유동성", view.buckets.risk.label, `HY OAS ${fmt(view.latest.BAMLH0A0HYM2, "%")}, M2 ${directionText(values("M2SL"))}`],
  ];
  document.querySelector("#scoreGrid").innerHTML = scoreItems.map(([label, value, note]) => `
    <div class="score"><span>${label}</span><b>${value}</b><span>${note}</span></div>
  `).join("");
}

function renderPlaybook() {
  const view = buildMacroView();
  const stance = view.total >= 3
    ? ["주식 비중: 점진 확대", "성장과 고용이 받쳐주고 신용 스트레스가 낮은 조합입니다. 금리와 물가 부담이 남아 있으면 분할 접근이 낫습니다."]
    : view.total <= -3
      ? ["주식 비중: 방어 우선", "여러 축이 동시에 부담입니다. 현금, 단기채, 방어주 비중을 점검하는 구간입니다."]
      : ["주식 비중: 선별 유지", "상승과 둔화 신호가 섞여 있습니다. 지수 전체보다 실적 가시성과 현금흐름이 강한 종목이 유리합니다."];
  const growthStyle = view.buckets.rates.score <= -2 || view.buckets.inflation.score <= -1
    ? ["성장주: 금리 확인 필요", "장기금리와 물가가 부담이면 멀티플 확장이 제한됩니다. 금리 하락 전환이 확인될 때 비중 확대 명분이 강해집니다."]
    : ["성장주: 조건부 우호", "금리 부담이 완화되면 장기 현금흐름 가치가 개선됩니다. 실적 성장률이 유지되는 기업을 우선 봅니다."];
  const cyclicals = view.buckets.growth.score + view.buckets.consumer.score >= 2
    ? ["경기민감주: 긍정", "산업생산, GDP, 소비가 받쳐주면 경기민감 업종의 이익 회복을 기대할 수 있습니다."]
    : ["경기민감주: 보수적", "성장 또는 소비 지표가 약하면 경기민감주는 실적 추정 하향에 취약합니다."];
  const dataTrust = view.freshRatio >= 0.5
    ? ["데이터 신뢰도: 양호", "대부분 또는 절반 이상의 지표가 Actions로 갱신되었습니다. 다음 갱신 시각은 GitHub Actions 실행 주기에 따릅니다."]
    : ["데이터 신뢰도: 보조 판단", "Actions가 아직 충분히 갱신하지 못했거나 초기 스냅샷입니다. 워크플로 첫 실행 후 다시 확인하세요."];
  document.querySelector("#playbookGrid").innerHTML = [stance, growthStyle, cyclicals, dataTrust].map(([title, text]) => `
    <article><h3>${title}</h3><p>${text}</p></article>
  `).join("");
}

function classifyIndicator(entry) {
  const value = entry.latestValue;
  const change = trend(entry.id);
  if (["DGS10", "MORTGAGE30US", "FEDFUNDS"].includes(entry.id)) {
    const burden = value >= (entry.id === "MORTGAGE30US" ? 6.5 : 4.25);
    return { text: burden ? "부담" : "완화", cls: burden ? "bad" : "good" };
  }
  if (["CPIAUCSL", "PCEPI"].includes(entry.id)) return { text: change > 0 ? "상승" : "완화", cls: change > 0 ? "bad" : "good" };
  if (entry.id === "UNRATE") return { text: value >= 4.8 ? "악화" : value >= 4.4 ? "주의" : "안정", cls: value >= 4.8 ? "bad" : value >= 4.4 ? "warn" : "good" };
  if (entry.id === "BAMLH0A0HYM2") return { text: value >= 4 ? "경계" : value >= 3.25 ? "주의" : "안정", cls: value >= 4 ? "bad" : value >= 3.25 ? "warn" : "good" };
  return { text: change >= 0 ? "개선" : "둔화", cls: change >= 0 ? "good" : "bad" };
}

function renderIndicators(filter = activeFilter) {
  activeFilter = filter;
  const visible = indicators.filter((entry) => filter === "all" || entry.group === filter);
  document.querySelector("#indicatorGrid").innerHTML = visible.map((entry) => {
    const badge = classifyIndicator(entry);
    return `
      <a class="indicator-card" href="${fredUrl(entry.id)}" target="_blank" rel="noreferrer">
        <div class="indicator-head">
          <div class="indicator-title"><span>${groupNames[entry.group]} · ${entry.id} · ${entry.fresh ? "Actions 갱신" : "스냅샷"}</span><h3>${entry.name}</h3></div>
          <span class="badge ${badge.cls}">${badge.text}</span>
        </div>
        <div class="indicator-value"><strong>${formatValue(entry, entry.latestValue)}</strong><span>${entry.unit}</span></div>
        ${sparkline(values(entry.id))}
        <div class="meta-row"><span>${entry.latestDate} 기준</span><span>${directionText(values(entry.id))}</span></div>
        <p>${entry.note}</p>
      </a>
    `;
  }).join("");
}

function renderCharts() {
  document.querySelector("#chartGrid").innerHTML = chartSets.map((chart) => `
    <article class="chart-card">
      <header><strong>${chart.title}</strong><span>${chart.label}</span></header>
      <img src="${fredImage(chart.ids)}" alt="${chart.title} FRED 차트" loading="lazy" />
    </article>
  `).join("");
}

function renderSources() {
  document.querySelector("#sourceList").innerHTML = indicators.map((entry) => `
    <a href="${fredUrl(entry.id)}" target="_blank" rel="noreferrer">${entry.name}<span>${entry.id}</span></a>
  `).join("");
}

function bindFilters() {
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderIndicators(button.dataset.filter);
    });
  });
}

function renderAll() {
  renderMacroJudgement();
  renderScores();
  renderIndicators(activeFilter);
  renderCharts();
  renderSources();
  renderPlaybook();
}

function get(id) { return macroData.series[id] || fallbackData.series[id]; }
function values(id) { return get(id).observations.map((row) => row.value); }
function trend(id) { const list = values(id); return list.at(-1) - list[0]; }
function setText(id, value) { const target = document.querySelector(`#${id}`); if (target) target.textContent = value; }
function fredUrl(id) { return `https://fred.stlouisfed.org/series/${id}`; }
function fredImage(ids) { return `https://fred.stlouisfed.org/graph/fredgraph.png?id=${ids}&cosd=2019-01-01`; }
function formatDateTime(date) { return Number.isNaN(date.valueOf()) ? "-" : new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(date); }
function fmt(value, unit) { return unit === "%" ? `${value.toFixed(2)}%` : value.toLocaleString("ko-KR", { maximumFractionDigits: 1 }); }
function directionText(list) { const diff = list.at(-1) - list[0]; return Math.abs(diff) < 0.01 ? "변화 작음" : diff > 0 ? "최근 상승" : "최근 하락"; }

function formatValue(entry, value) {
  if (entry.unit === "%" || entry.unit === "%p") return value.toFixed(Math.abs(value) < 10 ? 2 : 1);
  if (Math.abs(value) > 10000) return Math.round(value).toLocaleString("ko-KR");
  if (Math.abs(value) > 1000) return value.toLocaleString("ko-KR", { maximumFractionDigits: 1 });
  return value.toLocaleString("ko-KR", { maximumFractionDigits: 3 });
}

function sparkline(list) {
  const width = 280;
  const height = 62;
  const min = Math.min(...list);
  const max = Math.max(...list);
  const range = max - min || 1;
  const points = list.map((value, index) => {
    const x = (index / (list.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 10) - 5;
    return [x, y];
  });
  const path = points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const last = points.at(-1);
  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" role="img" aria-label="최근 추이"><path d="${path}"></path><circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="4"></circle></svg>`;
}

renderAll();
bindFilters();
loadData();
