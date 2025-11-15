import { format } from 'date-fns';

import { Priority, RepeatDay, Task } from '@/types';

import { mockGoal1 } from './mockGoal';

export const mockDefaultTask: Task = {
  id: '1',
  title: '매일 아침 산책하기',
  description: '매일 아침 산책하기',
  memo: '',
  priority: '보통' as Priority,
  repeatDays: ['월', '화', '수', '목', '금', '토', '일'] as RepeatDay[],
  isDone: false,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

export const mockHighPriorityTask: Task = {
  id: '2',
  title: '중요한 할 일',
  description: '빨간색으로 표시되는 중요한 할 일',
  memo: '',
  priority: '중요' as Priority,
  repeatDays: ['월', '수', '금'] as RepeatDay[],
  isDone: false,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

export const mockLowPriorityTask: Task = {
  id: '3',
  title: '낮은 우선순위 할 일',
  description: '초록색으로 표시되는 낮은 우선순위 할 일',
  memo: '',
  priority: '낮음' as Priority,
  repeatDays: ['토', '일'] as RepeatDay[],
  isDone: false,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

export const mockCompletedTask: Task = {
  id: '4',
  title: '완료된 할 일',
  description: '이미 완료된 할 일입니다',
  memo: '완료 메모가 있습니다',
  priority: '보통' as Priority,
  repeatDays: ['월', '화', '수', '목', '금'] as RepeatDay[],
  isDone: true,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

// Header.stories.tsx용 mock tasks
export const mockProjectTask: Task = {
  id: '5',
  title: '프로젝트 기획서 작성',
  description: '새로운 프로젝트의 기획서를 작성해야 합니다.',
  memo: '',
  priority: '중요' as Priority,
  repeatDays: ['월', '화', '수', '목', '금'] as RepeatDay[],
  isDone: true,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

export const mockCodeReviewTask: Task = {
  id: '6',
  title: '코드 리뷰',
  description: '팀원들의 코드를 리뷰하고 피드백을 제공합니다.',
  memo: '',
  priority: '보통' as Priority,
  repeatDays: ['월', '수', '금'] as RepeatDay[],
  isDone: true,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

export const mockMeetingTask: Task = {
  id: '7',
  title: '회의 준비',
  description: '내일 있을 회의 자료를 준비합니다.',
  memo: '',
  priority: '낮음' as Priority,
  repeatDays: ['화', '목'] as RepeatDay[],
  isDone: false,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

export const mockDocumentTask: Task = {
  id: '8',
  title: '문서 정리',
  description: '프로젝트 문서들을 정리하고 업데이트합니다.',
  memo: '',
  priority: '보통' as Priority,
  repeatDays: ['월', '금'] as RepeatDay[],
  isDone: false,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

export const mockTestTask: Task = {
  id: '9',
  title: '테스트 케이스 작성',
  description: '새로운 기능에 대한 테스트 케이스를 작성합니다.',
  memo: '',
  priority: '중요' as Priority,
  repeatDays: ['화', '목'] as RepeatDay[],
  isDone: false,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

// MemoDrawer.stories.tsx용 mock task
export const mockTaskWithMemo: Task = {
  id: '10',
  title: '프로젝트 회의 준비',
  description: '다음 주 월요일 프로젝트 회의 자료 준비하기',
  memo: `# 회의 준비 사항

## 주요 안건
- 프로젝트 진행 상황 공유
- 다음 스프린트 계획

## 준비할 자료
1. **발표 자료 10장**
2. 데모 영상
3. 성과 지표

### 참고 사항
> 발표 시간은 15분으로 제한

\`\`\`javascript
// 샘플 코드
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

- [ ] 자료 준비
- [x] 회의실 예약
`,
  priority: '중요' as Priority,
  repeatDays: ['월', '수', '금'] as RepeatDay[],
  isDone: false,
  goal: { id: 'g4', name: '업무', userId: '1' },
  startDate: format(new Date('2024-01-15'), 'yy-MM-dd'),
  userId: '1',
};

export const mockEmptyMemoTask: Task = {
  ...mockTaskWithMemo,
  id: '11',
  title: '빈 메모',
  memo: '',
};

export const mockSimpleMemoTask: Task = {
  ...mockTaskWithMemo,
  id: '12',
  title: '간단한 메모',
  memo: '이것은 간단한 텍스트 메모입니다.\n\n마크다운 없이 일반 텍스트로 작성되었습니다.',
};

export const mockComplexMarkdownTask: Task = {
  ...mockTaskWithMemo,
  id: '13',
  title: '복잡한 마크다운',
  memo: `# 프로젝트 문서

## 개요
이 프로젝트는 **할 일 관리 애플리케이션**입니다.

### 주요 기능
1. 할 일 생성
2. 우선순위 설정
3. 반복 일정
4. 메모 작성

### 기술 스택
- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

#### 코드 예시
\`\`\`typescript
interface Task {
  id: string;
  title: string;
  memo: string;
}
\`\`\`

> 이 프로젝트는 모던 웹 기술을 활용합니다.

---

#### 링크
[GitHub Repository](https://github.com/example/talktodo)

#### 체크리스트
- [x] 컴포넌트 설계
- [x] 스토리북 작성
- [ ] 테스트 작성
- [ ] 배포

| 항목 | 상태 | 비고 |
|------|------|------|
| 개발 | 진행중 | 80% |
| 테스트 | 대기 | - |
| 배포 | 예정 | 2024년 |
`,
};

// Form.stories.tsx용 빈 task
export const mockEmptyTask: Task = {
  id: 't1',
  title: '',
  description: '',
  memo: '',
  priority: '보통' as Priority,
  repeatDays: [],
  isDone: false,
  goal: mockGoal1,
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
};

// TaskViewContainer.stories.tsx용 helper function
export const createMockTask = (id: string, overrides?: Partial<Task>): Task => ({
  id,
  title: `할 일 ${id}`,
  description: `할 일 ${id}의 설명입니다`,
  memo: '',
  priority: '보통' as Priority,
  repeatDays: ['월', '화', '수', '목', '금'] as RepeatDay[],
  isDone: false,
  goal: {
    id: 'goal-1',
    name: '목표',
    userId: '1',
  },
  startDate: format(new Date(), 'yy-MM-dd'),
  userId: '1',
  ...overrides,
});
