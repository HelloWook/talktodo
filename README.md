# 🗣️ 톡투두 (TalkTodo)

AI 챗봇을 활용한 할 일 관리 서비스

## 📋 프로젝트 소개

톡투두는 AWS Lex 기반 AI 챗봇을 통해 자연어로 할 일을 생성하고 관리할 수 있는 웹 애플리케이션입니다. 사용자는 대화형 인터페이스를 통해 할 일을 정리하고, 목표를 설정하며, 우선순위를 관리할 수 있습니다.

## ✨ 주요 기능

### 🎯 할 일 관리

- 할 일 생성, 수정, 삭제
- 완료 상태 관리
- 우선순위 설정 (낮음, 보통, 중요)
- 반복 일정 설정 (요일별 반복)
- 메모 기능
- 날짜별 할 일 조회

### 🎯 목표 관리

- 목표 생성 및 관리
- 목표별 할 일 그룹화
- 목표별 진행 상황 추적

### 🤖 AI 챗봇

- AWS Lex 기반 자연어 처리
- 대화형 할 일 생성 및 정리
- 목표 선택 후 AI와 대화하여 할 일 관리

### 👤 사용자 인증

- 소셜 로그인 지원
  - Google
  - Naver
  - Kakao
- NextAuth 기반 인증 시스템

### 📱 PWA 지원

- 오프라인 사용 가능
- 앱처럼 설치 가능
- 서비스 워커를 통한 캐싱

### 🎨 UI/UX

- 반응형 디자인 (모바일/데스크톱)
- 다크 모드 지원 준비
- 부드러운 애니메이션 (Framer Motion)
- 접근성 고려 (ARIA 속성)

## 🛠️ 기술 스택

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **State Management**:
  - Zustand (전역 상태)
  - TanStack Query (서버 상태)
- **Form Handling**: React Hook Form + Zod
- **UI Components**: Radix UI

### Backend

- **Runtime**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth v5
- **AI Service**: AWS Lex Runtime V2

### 개발 도구

- **Testing**:
  - Jest (단위 테스트)
  - Vitest (컴포넌트 테스트)
  - Playwright (E2E 테스트)
  - Testing Library
- **Storybook**: 컴포넌트 문서화 및 시각적 테스트
- **Linting**: ESLint
- **Formatting**: Prettier
- **Git Hooks**: Husky + Commitizen

## 📁 프로젝트 구조

```
talktodo/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── api/               # API 라우트
│   │   ├── chat/              # AI 챗봇 페이지
│   │   ├── goal/              # 목표 관리 페이지
│   │   ├── login/             # 로그인 페이지
│   │   └── mypage/            # 마이페이지
│   ├── components/            # React 컴포넌트
│   │   ├── Alert/            # 알림 컴포넌트
│   │   ├── Chat/             # 챗봇 관련 컴포넌트
│   │   ├── Card/             # 카드 컴포넌트
│   │   ├── DialogManager/    # 다이얼로그 관리
│   │   ├── Goal*/            # 목표 관련 컴포넌트
│   │   ├── Task*/            # 할 일 관련 컴포넌트
│   │   └── ui/               # 공통 UI 컴포넌트
│   ├── hooks/                # 커스텀 훅
│   ├── lib/                  # 라이브러리 설정
│   │   ├── axios/            # Axios 설정
│   │   ├── prisma.ts         # Prisma 클라이언트
│   │   └── lexClient.ts      # AWS Lex 클라이언트
│   ├── repositories/         # 데이터 접근 레이어
│   ├── services/             # 비즈니스 로직 레이어
│   ├── stores/               # Zustand 스토어
│   ├── quries/               # React Query 훅
│   ├── types/                # TypeScript 타입 정의
│   └── utils/                # 유틸리티 함수
├── prisma/                   # Prisma 스키마 및 마이그레이션
├── public/                   # 정적 파일
│   ├── fonts/               # 폰트 파일
│   └── img/                 # 이미지 파일
└── assets/                   # 아이콘 등 리소스
```
