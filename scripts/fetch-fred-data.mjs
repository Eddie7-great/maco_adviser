import fs from "node:fs/promises";
import path from "node:path";

const series = [
  ["FEDFUNDS", "rates", "연방기금 실효금리", "%", [["2026-01", 3.64], ["2026-02", 3.64], ["2026-03", 3.64], ["2026-04", 3.64], ["2026-05", 3.63]], "기준금리 레벨이 높을수록 주식의 할인율 부담이 커집니다."],
  ["DGS10", "rates", "미국 10년물 국채금리", "%", [["2026-06-10", 4.55], ["2026-06-11", 4.45], ["2026-06-12", 4.48], ["2026-06-15", 4.47], ["2026-06-16", 4.43]], "장기금리는 성장주와 주택 관련주의 밸류에이션에 직접 영향을 줍니다."],
  ["T10Y2Y", "rates", "10년-2년 금리차", "%p", [["2026-06-11", 0.4], ["2026-06-12", 0.39], ["2026-06-15", 0.4], ["2026-06-16", 0.38], ["2026-06-17", 0.29]], "금리차가 낮거나 재역전되면 경기 둔화 우려가 커집니다."],
  ["CPIAUCSL", "inflation", "소비자물가지수", "index", [["2026-01", 326.588], ["2026-02", 327.46], ["2026-03", 330.293], ["2026-04", 332.407], ["2026-05", 333.979]], "물가가 다시 빨라지면 금리 인하 기대와 밸류에이션에 부담입니다."],
  ["PCEPI", "inflation", "PCE 물가지수", "index", [["2025-12", 128.576], ["2026-01", 129.002], ["2026-02", 129.52], ["2026-03", 130.381], ["2026-04", 130.902]], "연준이 선호하는 물가지표라 통화정책 기대에 민감합니다."],
  ["UNRATE", "labor", "실업률", "%", [["2026-01", 4.3], ["2026-02", 4.4], ["2026-03", 4.3], ["2026-04", 4.3], ["2026-05", 4.3]], "급격한 상승은 침체 위험 신호이고, 안정은 소비와 이익 전망에 우호적입니다."],
  ["PAYEMS", "labor", "비농업 고용", "천명", [["2026-01", 158592], ["2026-02", 158436], ["2026-03", 158650], ["2026-04", 158829], ["2026-05", 159001]], "고용 총량이 늘면 소비 여력이 유지됩니다. 둔화 속도가 핵심입니다."],
  ["GDPC1", "growth", "실질 GDP", "십억 달러", [["2025-Q1", 23548.21], ["2025-Q2", 23770.976], ["2025-Q3", 24026.834], ["2025-Q4", 24055.749], ["2026-Q1", 24152.656]], "실질 생산이 늘면 기업 이익 전망에 기본적으로 우호적입니다."],
  ["INDPRO", "growth", "산업생산", "index", [["2026-01", 101.1235], ["2026-02", 101.9493], ["2026-03", 101.6273], ["2026-04", 102.509], ["2026-05", 102.6475]], "제조와 광공업 활동은 경기민감 업종을 볼 때 중요한 선행 단서입니다."],
  ["RSAFS", "consumer", "소매판매", "백만 달러", [["2026-01", 734503], ["2026-02", 741278], ["2026-03", 754013], ["2026-04", 757036], ["2026-05", 763705]], "명목 소비 흐름입니다. 물가 영향을 빼고 실질 구매력도 함께 봐야 합니다."],
  ["UMCSENT", "consumer", "미시간대 소비심리", "index", [["2025-12", 52.9], ["2026-01", 56.4], ["2026-02", 56.6], ["2026-03", 53.3], ["2026-04", 49.8]], "소비심리는 재량소비주와 경기 체감에 민감한 경고등입니다."],
  ["HOUST", "consumer", "주택착공", "천호", [["2026-01", 1385], ["2026-02", 1346], ["2026-03", 1522], ["2026-04", 1392], ["2026-05", 1177]], "금리 부담과 건설 경기 변화를 빠르게 보여주는 민감 지표입니다."],
  ["M2SL", "risk", "M2 통화량", "십억 달러", [["2025-12", 22353.5], ["2026-01", 22429.3], ["2026-02", 22627], ["2026-03", 22686.4], ["2026-04", 22804.5]], "유동성 총량이 늘면 위험자산에 완충 역할을 할 수 있습니다."],
  ["MORTGAGE30US", "rates", "30년 고정 모기지", "%", [["2026-05-14", 6.36], ["2026-05-21", 6.51], ["2026-05-28", 6.53], ["2026-06-04", 6.48], ["2026-06-11", 6.52]], "모기지 금리는 주택 수요와 건설 관련주를 압박하거나 완화합니다."],
  ["BAMLH0A0HYM2", "risk", "하이일드 OAS", "%", [["2026-06-10", 2.8], ["2026-06-11", 2.78], ["2026-06-12", 2.71], ["2026-06-15", 2.66], ["2026-06-16", 2.71]], "신용 스프레드 급등은 위험자산 회피와 경기 스트레스를 뜻합니다."],
].map(([id, group, name, unit, snapshot, note]) => ({ id, group, name, unit, snapshot, note }));

const snapshotOnly = process.argv.includes("--snapshot-only");

function parseCsv(csv, id) {
  const rows = csv.trim().split(/\r?\n/).slice(1).map((line) => {
    const [date, raw] = line.split(",");
    const value = Number(raw);
    return Number.isFinite(value) ? { date, value } : null;
  }).filter(Boolean);
  if (!rows.length) throw new Error(`${id} returned no numeric observations`);
  return rows.slice(-5);
}

async function fetchCsv(id) {
  const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${encodeURIComponent(id)}`;
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

function fromRows(meta, observations, fresh, error = null) {
  return {
    id: meta.id,
    group: meta.group,
    name: meta.name,
    unit: meta.unit,
    note: meta.note,
    observations,
    latestDate: observations.at(-1).date,
    latestValue: observations.at(-1).value,
    fresh,
    error,
  };
}

function snapshot(meta, error = null) {
  return fromRows(meta, meta.snapshot.map(([date, value]) => ({ date, value })), false, error);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const output = {
    generatedAt: new Date().toISOString(),
    source: snapshotOnly ? "snapshot" : "FRED",
    successCount: 0,
    failed: [],
    series: {},
  };

  for (const meta of series) {
    if (snapshotOnly) {
      output.series[meta.id] = snapshot(meta);
      continue;
    }

    try {
      const csv = await fetchCsv(meta.id);
      output.series[meta.id] = fromRows(meta, parseCsv(csv, meta.id), true);
      output.successCount += 1;
      console.log(`updated ${meta.id}`);
    } catch (error) {
      output.failed.push(meta.id);
      output.series[meta.id] = snapshot(meta, String(error.message || error));
      console.warn(`fallback ${meta.id}: ${error.message || error}`);
    }
    await wait(350);
  }

  await fs.mkdir("data", { recursive: true });
  await fs.writeFile(path.join("data", "fred-data.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`wrote data/fred-data.json (${output.successCount}/${series.length} fresh)`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
