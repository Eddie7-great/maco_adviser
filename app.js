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

const fallbackKcifData = {
  generatedAt: "2026-06-18T00:00:00.000Z",
  source: "KCIF",
  listUrl: "https://www.kcif.or.kr/annual/monthlyList",
  reports: [
    {
      kind: "insight",
      label: "국제금융 INSIGHT",
      title: "[26.6월] 국제금융 INSIGHT",
      date: "2026.06.16",
      url: "https://www.kcif.or.kr/annual/monthlyList",
      source: "KCIF",
      focus: ["국제금융시장 전반의 정책, 자금흐름, 주요 자산가격 변화를 FRED 지표와 함께 교차 점검합니다."],
      implication: "미국 지표 중심의 FRED 판단에 글로벌 자금흐름과 정책 해석을 덧붙이는 보조 자료입니다.",
    },
    {
      kind: "riskWatch",
      label: "글로벌 리스크 워치",
      title: "[26.6월] 글로벌 리스크 워치",
      date: "2026.06.05",
      url: "https://www.kcif.or.kr/annual/reportView?mn=001004&pe=004008&pg=1&pp=10&rpt_no=37160&skey=&sval=",
      source: "KCIF",
      focus: [
        "선진국 장기금리의 높은 수준이 금융시장 부담 요인으로 부각되고 있습니다.",
        "유가와 물가 압력이 성장 둔화와 함께 나타날 경우 일부 지역의 스태그플레이션 위험을 키울 수 있습니다.",
      ],
      implication: "FRED 지표가 포착하지 못하는 지정학, 유가, 글로벌 금리, 신용 이벤트를 보완합니다.",
    },
  ],
  advice: [
    "장기금리 리스크가 부각될 때는 성장주, 리츠, 장기채처럼 듀레이션이 긴 자산의 비중 확대를 서두르지 않는 편이 낫습니다.",
    "유가와 물가 충격이 함께 언급되면 에너지, 원자재, 물가 방어력이 있는 현금흐름 기업을 우선 점검합니다.",
  ],
};

const groupNames = {
  rates: "금리",
  inflation: "물가",
  labor: "고용",
  growth: "성장",
  consumer: "소비/주택",
  risk: "유동성/신용",
};

const chartColors = ["#2d6f8f", "#176f52", "#a66b1f", "#a94c45"];

const indicatorHelp = {
  FEDFUNDS: {
    title: "연방기금 실효금리",
    what: "미국 은행들이 하루짜리 자금을 빌리고 빌려줄 때 실제로 형성되는 초단기 금리입니다. 연준 통화정책의 현재 긴축 강도를 보여줍니다.",
    up: "상승하면 자금 조달 비용과 할인율이 올라 성장주, 고평가주, 하이일드 채권 등 위험자산에는 대체로 부담입니다.",
    down: "하락하면 유동성 기대가 커져 성장주와 위험자산에는 우호적일 수 있지만, 경기 둔화 때문에 내리는 경우라면 방어적으로 봐야 합니다.",
  },
  DGS10: {
    title: "미국 10년물 국채금리",
    what: "미국 정부가 10년 동안 돈을 빌릴 때 시장이 요구하는 금리입니다. 글로벌 자산 가격의 기준 할인율 역할을 합니다.",
    up: "상승하면 주식 밸류에이션, 장기 성장주, 부동산·리츠에 부담입니다. 금융주는 일부 수혜를 볼 수 있습니다.",
    down: "하락하면 성장주와 장기채에는 우호적입니다. 다만 급락은 경기침체 우려 신호일 수 있습니다.",
  },
  T10Y2Y: {
    title: "10년-2년 금리차",
    what: "10년물 금리에서 2년물 금리를 뺀 값입니다. 장단기 금리차로 경기 기대와 침체 가능성을 볼 때 자주 씁니다.",
    up: "상승하면 경기 정상화 기대가 커진 것으로 해석될 수 있어 경기민감주에 우호적입니다.",
    down: "하락하거나 마이너스면 경기 둔화·침체 우려가 커져 위험자산에는 부담입니다.",
  },
  CPIAUCSL: {
    title: "소비자물가지수 CPI",
    what: "미국 소비자가 사는 상품과 서비스 가격의 평균 변화를 보여주는 대표 물가지표입니다.",
    up: "상승하면 금리 인하 기대가 약해져 주식, 특히 성장주에는 부담입니다. 원자재·물가연동 자산은 상대적으로 주목받을 수 있습니다.",
    down: "하락하면 금리 부담 완화 기대가 생겨 주식과 채권에 우호적일 수 있습니다.",
  },
  PCEPI: {
    title: "PCE 물가지수",
    what: "개인소비지출 가격지수입니다. 연준이 통화정책 판단에서 특히 중요하게 보는 물가지표입니다.",
    up: "상승하면 연준이 긴축적 태도를 유지할 가능성이 커져 위험자산에는 부담입니다.",
    down: "하락하면 금리 인하 기대가 강화되어 성장주, 장기채, 리츠에 우호적일 수 있습니다.",
  },
  UNRATE: {
    title: "실업률",
    what: "경제활동인구 중 일자리를 찾고 있지만 취업하지 못한 사람의 비율입니다.",
    up: "상승하면 소비와 기업 이익 둔화 우려가 커져 주식과 하이일드 채권에는 부담입니다.",
    down: "하락하면 고용과 소비가 견조하다는 신호라 경기민감주에 우호적입니다. 너무 낮으면 임금·물가 압력도 봐야 합니다.",
  },
  PAYEMS: {
    title: "비농업 고용",
    what: "농업을 제외한 미국 사업체의 고용자 수입니다. 매월 고용보고서의 핵심 지표입니다.",
    up: "증가하면 소비 여력과 기업 매출 기대가 좋아져 주식에 우호적입니다. 과열이면 금리 부담을 키울 수 있습니다.",
    down: "감소하면 경기 둔화 신호라 위험자산에는 부담이고 방어주·국채 선호가 커질 수 있습니다.",
  },
  GDPC1: {
    title: "실질 GDP",
    what: "물가 영향을 제거한 미국 경제 전체 생산 규모입니다. 경기의 큰 방향을 보여줍니다.",
    up: "상승하면 기업 이익 기반이 좋아져 주식, 경기민감주, 원자재에 우호적입니다.",
    down: "하락하면 침체 우려가 커져 위험자산에는 부담이고 방어자산 선호가 커집니다.",
  },
  INDPRO: {
    title: "산업생산",
    what: "제조업, 광업, 전력·가스 등 산업 부문의 생산량을 보여줍니다.",
    up: "상승하면 제조업과 경기민감 업종에 우호적이며 원자재 수요 기대도 좋아질 수 있습니다.",
    down: "하락하면 수요 둔화 신호라 산업재, 소재, 반도체 등 경기민감 자산에 부담입니다.",
  },
  RSAFS: {
    title: "소매판매",
    what: "미국 소매업체의 판매액입니다. 소비가 미국 경제를 얼마나 받쳐주는지 보는 지표입니다.",
    up: "상승하면 소비재, 경기민감주, 주식 전반에 우호적입니다. 물가 때문에 명목 판매만 늘었는지도 봐야 합니다.",
    down: "하락하면 소비 둔화 신호라 재량소비주와 위험자산에는 부담입니다.",
  },
  UMCSENT: {
    title: "미시간대 소비심리",
    what: "가계가 현재와 미래 경제를 어떻게 느끼는지 조사한 심리지표입니다.",
    up: "상승하면 소비 회복 기대가 커져 재량소비주와 경기민감주에 우호적입니다.",
    down: "하락하면 소비 위축 가능성이 커져 위험자산에는 부담입니다.",
  },
  HOUST: {
    title: "주택착공",
    what: "새 주택 건설이 시작된 건수입니다. 금리와 경기 변화에 민감한 주택 경기 지표입니다.",
    up: "상승하면 건설, 목재·소재, 주택 관련주에 우호적입니다.",
    down: "하락하면 금리 부담이나 수요 둔화 신호라 주택 관련주와 경기민감주에 부담입니다.",
  },
  M2SL: {
    title: "M2 통화량",
    what: "현금, 예금, 단기성 금융상품 등 넓은 의미의 돈의 양입니다. 유동성 환경을 볼 때 참고합니다.",
    up: "상승하면 유동성 완충이 생겨 주식과 위험자산에 우호적일 수 있습니다.",
    down: "하락하면 유동성 축소 신호라 위험자산에는 부담입니다.",
  },
  MORTGAGE30US: {
    title: "30년 고정 모기지 금리",
    what: "미국 30년 고정 주택담보대출 금리입니다. 주택 수요와 가계 부담을 보여줍니다.",
    up: "상승하면 주택 수요, 리츠, 건설주, 소비 여력에 부담입니다.",
    down: "하락하면 주택 관련주와 소비 심리에 우호적일 수 있습니다.",
  },
  BAMLH0A0HYM2: {
    title: "하이일드 OAS",
    what: "투기등급 회사채가 미국 국채보다 얼마나 높은 보상을 요구하는지 보여주는 신용 스프레드입니다.",
    up: "상승하면 신용위험 회피가 커진다는 뜻이라 주식, 하이일드 채권, 소형주에 부담입니다.",
    down: "하락하면 위험 선호가 개선되는 신호라 주식과 크레딧 자산에 우호적입니다.",
  },
};

const chartSets = [
  {
    title: "금리와 경기 압력",
    ids: "FEDFUNDS,DGS10,T10Y2Y",
    label: "FEDFUNDS · DGS10 · T10Y2Y",
    help: {
      title: "금리와 경기 압력",
      what: "기준금리, 장기금리, 장단기 금리차를 함께 보며 통화정책 부담과 경기 기대를 확인합니다.",
      up: "금리 레벨이 높아지고 금리차가 낮아지면 위험자산에는 부담입니다.",
      down: "금리 부담이 낮아지고 금리차가 정상화되면 성장주와 경기민감주에 우호적입니다.",
    },
  },
  {
    title: "물가 추세",
    ids: "CPIAUCSL,PCEPI",
    label: "CPIAUCSL · PCEPI",
    help: {
      title: "물가 추세",
      what: "CPI와 PCE를 함께 보며 연준의 금리 경로와 실질 구매력 부담을 판단합니다.",
      up: "물가 재상승은 금리 인하 기대를 낮춰 주식 밸류에이션에 부담입니다.",
      down: "물가 둔화는 금리 부담 완화와 실질소득 개선 기대를 통해 위험자산에 우호적입니다.",
    },
  },
  {
    title: "고용과 성장",
    ids: "UNRATE,PAYEMS,GDPC1",
    label: "UNRATE · PAYEMS · GDPC1",
    help: {
      title: "고용과 성장",
      what: "노동시장과 실질 성장률을 묶어 기업 이익과 소비 기반이 유지되는지 봅니다.",
      up: "고용과 GDP가 개선되면 주식과 경기민감 자산에 우호적입니다.",
      down: "고용 악화와 성장 둔화가 겹치면 방어주, 현금, 국채 선호가 커질 수 있습니다.",
    },
  },
  {
    title: "소비·주택·신용",
    ids: "RSAFS,HOUST,UMCSENT,BAMLH0A0HYM2",
    label: "RSAFS · HOUST · UMCSENT · HY OAS",
    help: {
      title: "소비·주택·신용",
      what: "소비 체력, 주택 경기, 신용위험을 함께 보며 위험 선호가 유지되는지 확인합니다.",
      up: "소비·주택은 상승이 우호적이지만, 하이일드 스프레드 상승은 위험자산에 부담입니다.",
      down: "소비·주택 둔화는 부담이고, 스프레드 하락은 위험 선호 개선 신호입니다.",
    },
  },
];

let macroData = fallbackData;
let indicators = Object.values(fallbackData.series);
let kcifData = fallbackKcifData;
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
  await Promise.all([loadFredData(), loadKcifData()]);
  renderAll();
}

async function loadFredData() {
  try {
    const response = await fetch(`data/fred-data.json?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    macroData = normalizeData(json);
    indicators = Object.values(macroData.series);
  } catch {
    macroData = fallbackData;
    indicators = Object.values(fallbackData.series);
  }
}

async function loadKcifData() {
  try {
    const response = await fetch(`data/kcif-reports.json?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    kcifData = normalizeKcifData(await response.json());
  } catch {
    kcifData = fallbackKcifData;
  }
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

function normalizeKcifData(data) {
  const reports = Array.isArray(data?.reports) && data.reports.length ? data.reports : fallbackKcifData.reports;
  const advice = Array.isArray(data?.advice) && data.advice.length ? data.advice : fallbackKcifData.advice;
  return {
    ...fallbackKcifData,
    ...data,
    reports,
    advice,
  };
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
  setText("cycleLabel", `${view.regime} · ${view.confidenceText}`);
  setText("cycleSummary", `금리 ${view.buckets.rates.label}, 물가 ${view.buckets.inflation.label}, 고용 ${view.buckets.labor.label}, 성장 ${view.buckets.growth.label}, 소비 ${view.buckets.consumer.label}, 신용 ${view.buckets.risk.label}로 평가됩니다.`);
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
  const assets = buildAssetPreference(view);
  const stance = view.total >= 3
    ? ["투자 비중: 점진 확대", "성장과 고용이 받쳐주고 신용 스트레스가 낮은 조합입니다. 금리와 물가 부담이 남아 있으면 한 번에 비중을 올리기보다 분할 접근이 더 적합합니다.", "wide"]
    : view.total <= -3
      ? ["투자 비중: 방어 우선", "여러 축이 동시에 부담입니다. 현금, 단기채, 방어주 비중을 점검하고, 레버리지와 경기민감 노출은 보수적으로 관리하는 구간입니다.", "wide"]
      : ["투자 비중: 선별 유지", "상승과 둔화 신호가 섞여 있습니다. 지수 전체보다 실적 가시성, 가격 결정력, 현금흐름이 강한 자산을 선별하는 쪽이 유리합니다.", "wide"];
  const growthStyle = view.buckets.rates.score <= -2 || view.buckets.inflation.score <= -1
    ? ["성장 자산", "장기금리와 물가가 부담이면 멀티플 확장이 제한됩니다. 금리 하락 전환이 확인될 때 성장주와 장기채 비중 확대 명분이 강해집니다.", "compact"]
    : ["성장 자산", "금리 부담이 완화되면 장기 현금흐름 가치가 개선됩니다. 실적 성장률이 유지되는 기업과 장기채가 상대적으로 유리합니다.", "compact"];
  const cyclicals = view.buckets.growth.score + view.buckets.consumer.score >= 2
    ? ["경기민감 자산", "산업생산, GDP, 소비가 받쳐주면 산업재, 소재, 반도체, 소비재의 이익 회복을 기대할 수 있습니다.", "compact"]
    : ["경기민감 자산", "성장 또는 소비 지표가 약하면 경기민감 업종은 실적 추정 하향에 취약합니다. 필수소비재와 헬스케어가 상대적으로 안정적입니다.", "compact"];
  const dataTrust = view.freshRatio >= 0.5
    ? ["데이터 상태", "FRED 지표 대부분을 최신 JSON으로 불러왔습니다. KCIF 월간보고서도 별도 JSON으로 함께 반영됩니다.", "compact muted-card"]
    : ["데이터 상태", "일부 지표는 내장 스냅샷으로 보조합니다. 원본 FRED와 KCIF 링크를 함께 확인하세요.", "compact muted-card"];
  const kcifCard = ["KCIF 리스크 보정", kcifPlaybookText(), "compact muted-card"];
  const assetCard = [
    "자산군 유리/불리",
    `<b>유리:</b>${assetListMarkup(assets.favorable)}<b>불리:</b>${assetListMarkup(assets.unfavorable)}<b>관찰:</b> ${assets.watch}`,
    "wide asset-card",
  ];
  document.querySelector("#playbookGrid").innerHTML = [stance, assetCard, growthStyle, cyclicals, kcifCard, dataTrust].map(([title, text, className]) => `
    <article class="playbook-card ${className}"><h3>${title}</h3><p>${text}</p></article>
  `).join("");
}

function buildAssetPreference(view) {
  const favorable = [];
  const unfavorable = [];
  const watch = [];

  if (view.buckets.rates.score <= -2 || view.buckets.inflation.score <= -1) {
    favorable.push("현금성 자산", "단기채", "퀄리티·배당주");
    unfavorable.push("장기 성장주", "리츠", "주택 관련주");
    watch.push("10년물 금리와 CPI/PCE 둔화 여부");
  } else {
    favorable.push("성장주", "장기채", "리츠");
    unfavorable.push("과도한 현금 비중");
    watch.push("금리 하락이 경기침체 신호인지 여부");
  }

  if (view.buckets.growth.score + view.buckets.consumer.score >= 2) {
    favorable.push("산업재", "소비재", "소재·반도체");
  } else {
    favorable.push("필수소비재", "헬스케어");
    unfavorable.push("경기민감주", "소형주");
    watch.push("소매판매와 산업생산 회복 여부");
  }

  if (view.buckets.risk.score <= -1) {
    favorable.push("미국 국채", "달러 방어 포지션");
    unfavorable.push("하이일드 채권", "레버리지 높은 기업");
    watch.push("하이일드 OAS 급등 여부");
  } else {
    favorable.push("우량 크레딧", "위험자산 분할 매수");
  }

  return {
    favorable: unique(favorable).slice(0, 7),
    unfavorable: unique(unfavorable).slice(0, 6),
    watch: unique(watch).join(", "),
  };
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
    const help = indicatorHelp[entry.id];
    return `
      <a class="indicator-card" href="${fredUrl(entry.id)}" target="_blank" rel="noreferrer">
        <div class="indicator-head">
          <div class="indicator-title">
            <span class="indicator-meta">${groupNames[entry.group]} · ${entry.id} · ${entry.fresh ? "지표 불러오기 성공" : "내장 스냅샷"}</span>
            <h3><span class="heading-label">${entry.name}</span>${helpMarkup(help)}</h3>
          </div>
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
      <header>
        <div class="chart-title"><strong>${chart.title}</strong>${helpMarkup(chart.help)}</div>
        <a class="chart-open-link" href="${fredGraphUrl(chart.ids)}" target="_blank" rel="noreferrer">FRED에서 열기</a>
      </header>
      ${chartKeyMarkup(chart)}
      <a class="chart-canvas-link" href="${fredGraphUrl(chart.ids)}" target="_blank" rel="noreferrer" aria-label="${chart.title} FRED 원본 열기">
        ${macroChart(chart)}
      </a>
      <a class="chart-fallback-link" href="${fredGraphUrl(chart.ids)}" target="_blank" rel="noreferrer">${chart.ids.split(",").map((id) => get(id).name).join(" · ")} · 원본 FRED</a>
    </article>
  `).join("");
}

function chartKeyMarkup(chart) {
  return `
    <div class="chart-key">
      ${chart.ids.split(",").map((id, index) => {
        const entry = get(id);
        return `
          <span>
            <i style="background:${chartColors[index % chartColors.length]}"></i>
            ${escapeHtml(entry.name)}
            <small>${escapeHtml(id)}</small>
          </span>
        `;
      }).join("")}
    </div>
  `;
}

function renderKcifReports() {
  const listUrl = kcifData.listUrl || "https://www.kcif.or.kr/annual/monthlyList";
  const generated = formatDateTime(new Date(kcifData.generatedAt));
  document.querySelector("#kcifGrid").innerHTML = kcifData.reports.map((report) => `
    <article class="kcif-card">
      <div class="kcif-card-head">
        <span>${escapeHtml(report.label || report.source || "KCIF")}</span>
        <a href="${escapeHtml(report.url || listUrl)}" target="_blank" rel="noreferrer">원문 보기</a>
      </div>
      <h3>${escapeHtml(report.title)}</h3>
      <p class="kcif-meta">${escapeHtml(report.date || "-")} · ${escapeHtml(report.source || "KCIF")}</p>
      ${reportFocusMarkup(report)}
      <p class="kcif-implication">${escapeHtml(report.implication || "FRED 지표를 보완하는 정성 리스크 자료입니다.")}</p>
    </article>
  `).join("");
  document.querySelector("#kcifAdvice").innerHTML = `
    <div>
      <span>KCIF 기반 투자 체크</span>
      <strong>${escapeHtml(kcifData.reports.map((report) => report.label).join(" · "))}</strong>
      <p>데이터 생성: ${escapeHtml(generated)} · <a href="${escapeHtml(listUrl)}" target="_blank" rel="noreferrer">월간보고서 목록</a></p>
    </div>
    <ul>${kcifData.advice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;
}

function renderSources() {
  const fredSources = indicators.map((entry) => `
    <a href="${fredUrl(entry.id)}" target="_blank" rel="noreferrer">${entry.name}<span>${entry.id}</span></a>
  `);
  const kcifSources = kcifData.reports.map((report) => `
    <a href="${escapeHtml(report.url || kcifData.listUrl)}" target="_blank" rel="noreferrer">${escapeHtml(report.label)}<span>KCIF</span></a>
  `);
  document.querySelector("#sourceList").innerHTML = [...fredSources, ...kcifSources].join("");
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

function bindInfoTooltips() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(".info-wrap");
    document.querySelectorAll(".info-wrap.open").forEach((item) => {
      if (item !== trigger) item.classList.remove("open");
    });
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    trigger.classList.toggle("open");
  });
}

function renderAll() {
  renderMacroJudgement();
  renderScores();
  renderIndicators(activeFilter);
  renderCharts();
  renderKcifReports();
  renderSources();
  renderPlaybook();
}

function get(id) { return macroData.series[id] || fallbackData.series[id]; }
function values(id) { return get(id).observations.map((row) => row.value); }
function trend(id) { const list = values(id); return list.at(-1) - list[0]; }
function setText(id, value) { const target = document.querySelector(`#${id}`); if (target) target.textContent = value; }
function unique(list) { return [...new Set(list)]; }
function fredUrl(id) { return `https://fred.stlouisfed.org/series/${id}`; }
function fredGraphUrl(ids) { return `https://fred.stlouisfed.org/graph/?id=${ids.split(",").map(encodeURIComponent).join(",")}`; }
function formatDateTime(date) { return Number.isNaN(date.valueOf()) ? "-" : new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(date); }
function shortDate(value) {
  const text = String(value || "");
  if (/^\d{4}-Q\d$/.test(text)) return text.replace("-Q", " Q");
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const [year, month, day] = text.split("-");
    return `${year.slice(2)}.${Number(month)}.${Number(day)}`;
  }
  if (/^\d{4}-\d{2}$/.test(text)) {
    const [year, month] = text.split("-");
    return `${year.slice(2)}.${Number(month)}`;
  }
  return text;
}
function fmt(value, unit) { return unit === "%" ? `${value.toFixed(2)}%` : value.toLocaleString("ko-KR", { maximumFractionDigits: 1 }); }
function directionText(list) { const diff = list.at(-1) - list[0]; return Math.abs(diff) < 0.01 ? "변화 작음" : diff > 0 ? "최근 상승" : "최근 하락"; }

function helpMarkup(help) {
  if (!help) return "";
  return `
    <span class="info-wrap" tabindex="0" role="button" aria-label="${escapeHtml(help.title)} 설명 보기">
      <span class="info-dot" aria-hidden="true">❔</span>
      <span class="tooltip-panel" role="tooltip">
        <strong>${escapeHtml(help.title)}</strong>
        <span>${escapeHtml(help.what)}</span>
        <span><b>상승:</b> ${escapeHtml(help.up)}</span>
        <span><b>하락:</b> ${escapeHtml(help.down)}</span>
      </span>
    </span>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function reportFocusMarkup(report) {
  const focus = Array.isArray(report.focus) && report.focus.length ? report.focus : ["원문 보고서에서 최신 리스크 포커스를 확인하세요."];
  return `<ul class="kcif-focus">${focus.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function kcifPlaybookText() {
  const focusText = kcifData.reports.flatMap((report) => report.focus || []).join(" ");
  const latest = kcifData.reports.map((report) => report.title).filter(Boolean).join(", ");
  const prefix = latest ? `최신 KCIF 월간보고서(${latest}) 기준으로 ` : "최신 KCIF 월간보고서 기준으로 ";
  if (/금리|장기금리|국채/.test(focusText)) return `${prefix}장기금리 리스크가 확인됩니다. 성장주, 리츠, 장기채처럼 금리 민감도가 큰 자산은 FRED 금리 지표가 꺾이는지 확인하며 접근하는 편이 좋습니다.`;
  if (/유가|중동|스태그플레이션|물가/.test(focusText)) return `${prefix}유가와 물가 충격을 함께 봐야 합니다. 에너지와 현금흐름 방어력이 있는 기업은 상대적으로 유리하고, 운송·재량소비는 비용 압박을 점검해야 합니다.`;
  if (/신흥국|달러|외환|자본유출/.test(focusText)) return `${prefix}달러와 신흥국 스트레스 여부를 확인해야 합니다. 위험자산 비중 확대 전 달러와 미국 국채의 방어력을 함께 봅니다.`;
  return `${prefix}FRED가 보여주는 계량 신호에 글로벌 이벤트 리스크를 더해 투자 비중을 보정합니다. 원문 보고서의 월간 포커스를 함께 확인하세요.`;
}

function assetListMarkup(list) {
  return `<span class="asset-list">${list.map((name) => `<span class="asset-pill">${escapeHtml(name)}<small>${escapeHtml(assetReason(name))}</small></span>`).join("")}</span>`;
}

function assetReason(name) {
  const reasons = {
    "현금성 자산": "금리·물가 부담이 클 때 변동성을 낮춥니다.",
    "단기채": "금리 변동에 덜 민감하고 이자수익 방어가 됩니다.",
    "퀄리티·배당주": "현금흐름과 배당이 약한 경기에서 버팀목입니다.",
    "장기 성장주": "금리 하락 시 장기 현금흐름 가치가 커집니다.",
    "리츠": "금리 부담 완화와 배당 매력이 함께 작동합니다.",
    "장기채": "금리 하락 구간에서 가격 상승 여지가 큽니다.",
    "산업재": "생산과 투자 회복의 직접 수혜를 받습니다.",
    "소비재": "소비 지표 개선 시 매출 기대가 살아납니다.",
    "소재·반도체": "경기 회복과 재고 사이클 개선에 민감합니다.",
    "필수소비재": "소비 둔화에도 수요가 비교적 안정적입니다.",
    "헬스케어": "경기 민감도가 낮아 방어력이 있습니다.",
    "미국 국채": "신용위험이 커질 때 안전자산 선호를 받습니다.",
    "달러 방어 포지션": "위험 회피 국면에서 방어 수단이 됩니다.",
    "우량 크레딧": "스프레드가 안정적일 때 이자수익과 방어를 겸합니다.",
    "위험자산 분할 매수": "신용 스트레스가 낮으면 단계적 진입이 가능합니다.",
    "과도한 현금 비중": "위험 선호가 회복될 때 기회비용이 커집니다.",
    "경기민감주": "성장·소비 둔화 시 이익 추정이 빠르게 낮아질 수 있습니다.",
    "소형주": "신용여건과 경기 둔화에 취약합니다.",
    "하이일드 채권": "스프레드 확대 시 가격 하락 위험이 큽니다.",
    "레버리지 높은 기업": "차입비용과 만기 재조달 부담이 커집니다.",
    "주택 관련주": "모기지 금리 상승과 착공 둔화에 눌릴 수 있습니다.",
  };
  return reasons[name] || "현재 매크로 조합에 민감하게 반응합니다.";
}

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

function macroChart(chart) {
  const width = 720;
  const height = 320;
  const margin = { top: 20, right: 28, bottom: 42, left: 54 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const ids = chart.ids.split(",");
  const series = ids.map((id, index) => {
    const entry = get(id);
    const observations = entry.observations;
    const vals = observations.map((row) => row.value);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;
    const points = observations.map((row, pointIndex) => {
      const x = margin.left + (pointIndex / Math.max(1, observations.length - 1)) * plotWidth;
      const y = margin.top + plotHeight - ((row.value - min) / range) * plotHeight;
      return { ...row, x, y };
    });
    return { id, entry, points, color: chartColors[index % chartColors.length] };
  });
  const allDates = series[0]?.points || [];
  const firstDate = allDates[0]?.date || "";
  const lastDate = allDates.at(-1)?.date || "";

  return `
    <svg class="macro-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(chart.title)} 최근 추이 비교">
      <rect class="chart-bg" x="0" y="0" width="${width}" height="${height}" rx="8"></rect>
      <line class="axis" x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}"></line>
      <line class="axis" x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}"></line>
      <line class="grid-line" x1="${margin.left}" y1="${margin.top}" x2="${width - margin.right}" y2="${margin.top}"></line>
      <line class="grid-line" x1="${margin.left}" y1="${margin.top + plotHeight / 2}" x2="${width - margin.right}" y2="${margin.top + plotHeight / 2}"></line>
      <text class="axis-label" x="14" y="${margin.top + 4}">상대 높음</text>
      <text class="axis-label" x="14" y="${height - margin.bottom + 4}">상대 낮음</text>
      <text class="axis-label" x="${margin.left}" y="${height - 14}">${escapeHtml(shortDate(firstDate))}</text>
      <text class="axis-label end" x="${width - margin.right}" y="${height - 14}">${escapeHtml(shortDate(lastDate))}</text>
      ${series.map((line) => `
        <path class="macro-line" d="${line.points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ")}" style="stroke:${line.color}"></path>
        ${line.points.map((point) => `
          <circle class="macro-point" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="5" style="fill:${line.color}">
            <title>${line.entry.name} · ${point.date} · ${formatValue(line.entry, point.value)} ${line.entry.unit}</title>
          </circle>
        `).join("")}
      `).join("")}
    </svg>
  `;
}

renderAll();
bindFilters();
bindInfoTooltips();
loadData();
