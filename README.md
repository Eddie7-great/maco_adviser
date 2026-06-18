# Maco Adviser

FRED 자료를 기반으로 미국 거시경제 상황을 추적하고, 주식 투자 관점의 해석을 제공하는 정적 대시보드입니다.

## 구조

- `index.html`: GitHub Pages에서 열리는 대시보드
- `styles.css`: 화면 스타일
- `app.js`: `data/fred-data.json`을 읽어 지표 카드, 매크로 판단, 투자 해석을 렌더링
- `scripts/fetch-fred-data.mjs`: FRED CSV를 내려받아 `data/fred-data.json`을 생성
- `.github/workflows/update-fred-data.yml`: 6시간마다 FRED 데이터를 자동 갱신

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

GitHub Actions가 6시간마다 `data/fred-data.json`을 갱신합니다. 바로 갱신하려면 Actions 탭에서 `Update FRED data` 워크플로를 수동 실행하세요.

## 로컬 확인

Node.js가 있다면 초기 스냅샷 JSON을 다시 만들 수 있습니다.

```powershell
node scripts/fetch-fred-data.mjs --snapshot-only
```

실제 FRED 데이터를 가져오려면:

```powershell
node scripts/fetch-fred-data.mjs
```

이 페이지는 투자 판단을 돕기 위한 경제 모니터링 도구이며 매수·매도 추천이 아닙니다.
