<!-- PR 제목 예시: feat(card): 카드 컴포넌트 및 관련 UI 컴포넌트 개발 -->

# 🎯 개요

- 이 PR의 목적과 배경을 간단히 설명해 주세요.

## ✨ 주요 변경사항

### 🃏 Card 컴포넌트 (`src/components/Card/Card.tsx`)

- [ ] Compound Component 패턴 적용 (`Card`, `Card.Title`, `Card.Description`, `Card.Data`, `Card.Item`)
- [ ] Context API 적용 (`CardProvider`, `useCardContext`)
- [ ] 완료 상태 시각 피드백(배경색/취소선) 및 접근성 속성(`aria-label`, `aria-pressed`)
- [ ] 우선순위별 색상/반복 요일 표시

### 🎯 ActiveIcon (`src/components/ActiveIcon/ActiveIcon.tsx`)

- [ ] 활성/비활성 시각 상태 반영, SVG 스프라이트 기반, 스타일 커스터마이징

### 🔴 Dot (`src/components/Dot/Dot.tsx`)

- [ ] 우선순위 색상: 낮음(초록), 보통(노랑), 중요(빨강) + `role="status"`

### 🎨 Icon 개선 (`src/components/Icon/Icon.tsx`)

- [ ] SVG Sprite 시스템 및 접근성(`aria-label`) 개선

### 🛠️ 유틸/타입

- [ ] `Task` 타입 (`src/types/Task.ts`)
- [ ] 반복 요일 유틸 (`src/utils/getRepeatData.ts`): 전체 요일=“매일”, 부분 선택=“월 ・ 화 ・ 수”

## 🧪 테스트 및 문서화

- [ ] Storybook 스토리 추가/업데이트 (시나리오: 기본/우선순위/완료)
- [ ] 단위 테스트 추가(상호작용/접근성 포함)
- [ ] 커버리지 영향도: <!-- ex) +5%, 변화 없음 -->

```md
Story 목록 예시

- Card: 기본, 높은 우선순위, 낮은 우선순위, 완료됨
- ActiveIcon: 활성/비활성/크기/커스텀
- Dot: 모든 우선순위/크기/인터랙티브
```

## 🎨 디자인 시스템 반영

- [ ] 색상: 우선순위(초록/노랑/빨강), 상태(완료:보라/미완료:흰색), 인터랙션(호버 테두리)
- [ ] 레이아웃: 반응형/간격/패딩/터치 영역

## 🔧 기술 포인트

- [ ] TypeScript (완전 타입)
- [ ] Tailwind CSS
- [ ] Framer Motion (애니메이션)
- [ ] Context API
- [ ] Compound Component 구조

## ✅ 체크리스트

- [ ] 빌드 및 타입체크 통과
- [ ] 린트/포맷 통과
- [ ] 스냅샷/단위 테스트 통과
- [ ] 접근성 점검(키보드 탐색/aria 속성)
- [ ] 브라우저/반응형 간단 확인

## 📦 영향 범위

- 영향받는 페이지/컴포넌트: <!-- 예: 대시보드, 카드 리스트 -->
- 브레이킹 체인지: <!-- 예: 없음 / props 변경: ... -->

## 🧭 테스트 시나리오 요약

1. 카드 완료 토글 시 시각 피드백 및 `aria-pressed` 변경
2. 우선순위에 따라 Dot 색상 변화
3. 반복 요일 표기 변환(매일/부분)
4. 아이콘 접근성 라벨 확인

## 📝 추가 메모

- 리뷰 포인트 / 리스크 / 후속 작업 계획 등
