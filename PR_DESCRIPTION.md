<!-- PR 제목 예시: feat(goal): Goal API 개발 및 연동, 스켈레톤 UI 개선 -->

# 🎯 개요

- Goal(목표) 기능의 백엔드 API 개발 및 프론트엔드 연동
- Form 컴포넌트 리팩토링을 통한 타입 유연성 및 재사용성 향상
- 로딩 상태 개선을 위한 스켈레톤 UI 추가
- 사용자 경험 개선을 위한 데이터 프리패치 및 사이드바 유저 정보 표시

## ✨ 주요 변경사항

### 🎯 Goal API 개발 (`src/app/api/goal/route.ts`)

- [x] POST: Goal 생성 API 구현 (인증, 유효성 검증 포함)
- [x] GET: 사용자별 Goal 목록 조회 API 구현
- [x] PATCH: Goal 수정 API 구현
- [x] 에러 핸들링 (ZodError, 인증 에러 등)
- [x] Prisma 스키마에 `userId` 필드 추가 (`prisma/schema.prisma`)

### 🎨 Goal Dialog 컴포넌트

#### GoalFormDialog (`src/components/GoalFormDialog/GoalFormDialog.tsx`)

- [x] Goal 생성 다이얼로그 컴포넌트 개발
- [x] React Hook Form + Zod를 통한 폼 유효성 검증
- [x] Storybook 스토리 추가 (`GoalFormDialog.stories.tsx`)

#### GoalEditDialog (`src/components/GoalEditDialog/GoalEditDialog.tsx`)

- [x] Goal 수정 다이얼로그 컴포넌트 개발
- [x] 기존 Goal 데이터를 기본값으로 설정
- [x] 수정 완료 시 목록 자동 갱신

### 🔄 Form 컴포넌트 리팩토링 (`src/components/Form/Form.tsx`)

- [x] 공통 속성 통합 및 타입 유연성 구축
- [x] Context API를 통한 폼 상태 관리 (`FormContext`, `useFormContext`)
- [x] Compound Component 패턴 유지 (`Form.Header`, `Form.InputField`, `Form.FormActions` 등)
- [x] 제네릭 타입 지원으로 다양한 폼 타입 처리 가능
- [x] 기존 TaskFormDialog, TaskEditDialog에 리팩토링된 Form 적용

### 📡 Goal API 연동

#### Repository Layer (`src/repositories/goal.repository.ts`)

- [x] Goal 데이터베이스 CRUD 작업 추상화
- [x] Prisma를 통한 데이터 접근

#### Service Layer (`src/services/goal.service.ts`)

- [x] 비즈니스 로직 처리
- [x] Repository 패턴 적용

#### API Client (`src/lib/axios/goal.axios.ts`)

- [x] Goal API 호출 함수 구현 (`getGoals`, `createGoal`, `updateGoal`)

#### React Query Hooks (`src/quries/useGoal.ts`)

- [x] `useGetGoals`: Goal 목록 조회 훅
- [x] `useCreateGoal`: Goal 생성 훅 (성공 시 토스트 메시지, 쿼리 무효화)
- [x] `useUpdateGoal`: Goal 수정 훅 (성공 시 토스트 메시지, 쿼리 무효화)
- [x] Query Key 관리 (`src/quries/queryKey/queryKeys.ts`)

### 🎨 스켈레톤 UI 개선

#### MenuSideBarSkeleton (`src/components/MenuSideBar/MenuSideBarSkeleton.tsx`)

- [x] 사이드바 로딩 상태를 위한 스켈레톤 컴포넌트 개발
- [x] SideBar 컴포넌트 구조를 반영한 스켈레톤 레이아웃
- [x] Storybook 스토리 추가 (`MenuSideBarSkeleton.stories.tsx`)
- [x] MenuSideBar에서 로딩 시 스켈레톤 표시

#### 초기 로딩 스켈레톤 처리 (`src/app/page.tsx`, `src/components/TaskContainer/TaskContainer.tsx`)

- [x] 초기 로딩 시 TaskHeader, TaskLayout 스켈레톤 동시 표시
- [x] Storybook 스토리 추가 (`TaskHeaderSkeleton.stories.tsx`, `TaskLayoutSkeleton.stories.tsx`)

### ⚡ 성능 최적화

#### 데이터 프리패치 (`src/components/TaskContainer/TaskContainer.tsx`)

- [x] 선택된 날짜 기준 전후 2일 데이터 프리패치 구현
- [x] React Query의 `prefetchQuery` 활용
- [x] 날짜 변경 시 자동 프리패치

### 👤 사용자 경험 개선

#### 사이드바 유저 정보 표시 (`src/components/MenuSideBar/MenuSideBar.tsx`)

- [x] 사이드바 하단에 유저 닉네임 및 이메일 표시
- [x] 이메일 포맷팅 유틸 함수 추가 (`src/utils/formatEmail.ts`)
- [x] SideBar.ProfileSection 컴포넌트 활용

### 🛠️ 유틸리티 및 검증

#### Zod 에러 메시지 개선 (`src/lib/validation/goal.ts`, `src/lib/validation/task.ts`)

- [x] 사용자 친화적인 에러 메시지로 개선
- [x] GoalFormDialog에서 에러 메시지 표시

#### 에러 상수 추가 (`src/constants/error.ts`)

- [x] Goal 관련 에러 메시지 상수 정의

## 🧪 테스트 및 문서화

- [x] Storybook 스토리 추가/업데이트
  - GoalFormDialog: 기본 생성 다이얼로그
  - MenuSideBarSkeleton: 로딩 상태
  - TaskHeaderSkeleton, TaskLayoutSkeleton: 초기 로딩 상태
- [x] Form 컴포넌트 단위 테스트 업데이트 (`Form.test.tsx`)
- [ ] 커버리지 영향도: <!-- 추후 확인 필요 -->

```md
Story 목록

- GoalFormDialog: 기본 생성 다이얼로그
- MenuSideBarSkeleton: 사이드바 로딩 상태
- TaskHeaderSkeleton: 헤더 로딩 상태
- TaskLayoutSkeleton: 레이아웃 로딩 상태
```

## 🎨 디자인 시스템 반영

- [x] 스켈레톤 UI: 보라색 계열 (`bg-purple-100`, `bg-purple-300`)로 통일
- [x] 레이아웃: 기존 SideBar 구조를 반영한 스켈레톤 레이아웃
- [x] 다이얼로그: 기존 Form 컴포넌트 스타일 일관성 유지

## 🔧 기술 포인트

- [x] TypeScript (완전 타입)
- [x] Next.js App Router (API Routes)
- [x] Prisma ORM
- [x] React Query (TanStack Query)
- [x] React Hook Form + Zod
- [x] Context API (Form 컴포넌트)
- [x] Compound Component 패턴
- [x] Repository Pattern
- [x] Service Layer Pattern

## ✅ 체크리스트

- [x] 빌드 및 타입체크 통과
- [x] 린트/포맷 통과
- [x] 스냅샷/단위 테스트 통과
- [x] 접근성 점검(키보드 탐색/aria 속성)
- [x] 브라우저/반응형 간단 확인

## 📦 영향 범위

- 영향받는 페이지/컴포넌트:
  - 메인 페이지 (`src/app/page.tsx`): 초기 로딩 스켈레톤 추가
  - 사이드바 (`src/components/MenuSideBar/MenuSideBar.tsx`): Goal 목록 표시, 유저 정보 표시, 스켈레톤 처리
  - Task 관련 다이얼로그: 리팩토링된 Form 컴포넌트 사용
- 브레이킹 체인지: 없음 (기존 기능 유지)

## 🧭 테스트 시나리오 요약

1. Goal 생성: 사이드바에서 "새 목표" 버튼 클릭 → 다이얼로그에서 목표 입력 → 생성 성공 토스트 확인
2. Goal 수정: 사이드바에서 목표 클릭 → 다이얼로그에서 수정 → 수정 성공 토스트 확인
3. Goal 목록 조회: 사이드바에 사용자의 모든 목표 표시 확인
4. 스켈레톤 UI: 초기 로딩 시 스켈레톤 표시 확인
5. 데이터 프리패치: 날짜 변경 시 전후 2일 데이터 자동 로드 확인
6. 유저 정보 표시: 사이드바 하단에 닉네임 및 이메일 표시 확인

## 📝 추가 메모

### 커밋 내역

1. `9f4189e` - refactor: 폼 컴포넌트의 공통되는 속성 통합 및 타입 유연성 구축
2. `88e4cf4` - feat: gaol dialog 개발
3. `7e8318a` - feat: zod 에러 메시지 수정
4. `79e1d9f` - feat: 골 api 개발 및 연동
5. `7f200fd` - feat: 사이드바 스켈레톤 처리
6. `e872e10` - feat: 초기 로딩 시 동시 스켈레톤 처리
7. `4901eae` - feat: 전후 이틀 프리패치 하도록 수정
8. `9fec651` - feat: 골 수정 api 개발 및 연동
9. `8596142` - feat: 사이드바 유저 정보 표시하도록 수정

### 리뷰 포인트

- Goal API의 에러 핸들링이 적절한지 확인
- Form 컴포넌트 리팩토링이 기존 코드와의 호환성을 유지하는지 확인
- 스켈레톤 UI의 디자인이 실제 콘텐츠와 일치하는지 확인
- 프리패치 로직이 성능에 미치는 영향 확인

### 후속 작업 계획

- Goal 삭제 기능 추가
- Goal 상세 페이지 개발
- Goal과 Task의 연관 관계 UI 개선
