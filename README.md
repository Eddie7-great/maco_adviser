# Maco Adviser

FRED 자료와 KCIF 월간보고서를 기반으로 미국 거시경제 상황과 글로벌 리스크를 추적하고, 투자 관점의 해석을 제공하는 정적 대시보드입니다.

## 구조

- `index.html`: GitHub Pages에서 열리는 대시보드
- `styles.css`: 화면 스타일
- `app.js`: `data/fred-data.json`과 `data/kcif-reports.json`을 읽어 지표 카드, 매크로 판단, KCIF 리스크, 투자 해석을 렌더링
- `scripts/fetch-fred-data.mjs`: FRED CSV를 내려받아 `data/fred-data.json`을 생성
- `scripts/fetch-kcif-reports.mjs`: KCIF 월간보고서 목록에서 최신 국제금융 INSIGHT와 글로벌 리스크 워치를 수집
- `.github/workflows/update-fred-data.yml`: 6시간마다 FRED와 KCIF 데이터를 자동 갱신

## GitHub Pages 설정

1. Repository `Settings`로 이동
2. `Pages` 메뉴 선택
3. `Build and deployment`에서 `Deploy from a branch` 선택
4. Branch: `main`, Folder: `/ (root)` 선택
5. 저장 후 아래 주소 형식으로 접속

```text
https://Eddie7-great.github.io/maco_adviser/
```

## 데이터 갱신

GitHub Actions가 6시간마다 `data/fred-data.json`과 `data/kcif-reports.json`을 갱신합니다. 바로 갱신하려면 Actions 탭에서 `Update macro data` 워크플로를 수동 실행하세요.

페이지는 열릴 때마다 캐시를 우회해서 두 JSON 파일을 다시 읽습니다. 다만 GitHub Pages 정적 사이트이므로 페이지를 여는 행위가 FRED/KCIF 원본 수집을 즉시 실행하지는 않습니다. 원본 수집은 GitHub Actions가 담당합니다.

## 바로가기

Windows에서 바로 열 수 있도록 `Maco Adviser.url` 바로가기 파일을 포함했습니다.

## 로컬 확인

Node.js가 있다면 초기 스냅샷 JSON을 다시 만들 수 있습니다.

```powershell
node scripts/fetch-fred-data.mjs --snapshot-only
```

실제 FRED 데이터를 가져오려면:

```powershell
node scripts/fetch-fred-data.mjs
```

KCIF 최신 월간보고서를 가져오려면:

```powershell
node scripts/fetch-kcif-reports.mjs
```

이 페이지는 투자 판단을 돕기 위한 경제 모니터링 도구이며 매수·매도 추천이 아닙니다.
