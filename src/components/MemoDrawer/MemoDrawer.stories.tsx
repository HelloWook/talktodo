import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import { Task } from '@/types/Task';

import MemoDrawer from './MemoDrawer';

const meta: Meta<typeof MemoDrawer> = {
  title: 'Components/MemoDrawer',
  component: MemoDrawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MemoDrawer>;

const mockTask: Task = {
  id: '1',
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
  priority: '중요',
  repeatDays: ['월', '수', '금'],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15'),
  isDone: false,
  goal: { id: 'g1', name: '업무' },
};

const emptyTask: Task = {
  ...mockTask,
  id: '2',
  title: '빈 메모',
  memo: '',
};

const InteractiveWrapper = ({ task }: { task: Task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(task);

  const handleSaveMemo = (taskId: string, memo: string) => {
    setCurrentTask((prev) => ({ ...prev, memo }));
    alert(`메모 저장됨:\n${memo.substring(0, 100)}${memo.length > 100 ? '...' : ''}`);
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-purple-50'>
      <button
        onClick={() => setIsOpen(true)}
        className='rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-purple-600'
      >
        메모 열기
      </button>
      <MemoDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} task={currentTask} onSaveMemo={handleSaveMemo} />
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveWrapper task={mockTask} />,
};

export const EmptyMemo: Story = {
  render: () => <InteractiveWrapper task={emptyTask} />,
};

export const SimpleMemo: Story = {
  render: () => (
    <InteractiveWrapper
      task={{
        ...mockTask,
        id: '3',
        title: '간단한 메모',
        memo: '이것은 간단한 텍스트 메모입니다.\n\n마크다운 없이 일반 텍스트로 작성되었습니다.',
      }}
    />
  ),
};

export const ComplexMarkdown: Story = {
  render: () => (
    <InteractiveWrapper
      task={{
        ...mockTask,
        id: '4',
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
      }}
    />
  ),
};
