import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Task } from '@/types/Task';

import Header from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Header',
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Header>;

const mockTasks: Task[] = [
  {
    id: '1',
    title: '프로젝트 기획서 작성',
    description: '새로운 프로젝트의 기획서를 작성해야 합니다.',
    memo: '',
    priority: '중요',
    repeatDays: ['월', '화', '수', '목', '금'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDone: true,
  },
  {
    id: '2',
    title: '코드 리뷰',
    description: '팀원들의 코드를 리뷰하고 피드백을 제공합니다.',
    memo: '',
    priority: '보통',
    repeatDays: ['월', '수', '금'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDone: true,
  },
  {
    id: '3',
    title: '회의 준비',
    description: '내일 있을 회의 자료를 준비합니다.',
    memo: '',
    priority: '낮음',
    repeatDays: ['화', '목'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDone: false,
  },
  {
    id: '4',
    title: '문서 정리',
    description: '프로젝트 문서들을 정리하고 업데이트합니다.',
    memo: '',
    priority: '보통',
    repeatDays: ['월', '금'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDone: false,
  },
  {
    id: '5',
    title: '테스트 케이스 작성',
    description: '새로운 기능에 대한 테스트 케이스를 작성합니다.',
    memo: '',
    priority: '중요',
    repeatDays: ['화', '목'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDone: false,
  },
];

const completedTasks: Task[] = mockTasks.map((task) => ({ ...task, isDone: true }));

export const Default: Story = {
  render: () => (
    <Header.Provider tasks={mockTasks}>
      <Header>
        <Header.Content />
      </Header>
    </Header.Provider>
  ),
};

export const Completed: Story = {
  render: () => (
    <Header.Provider tasks={completedTasks}>
      <Header>
        <Header.Content />
      </Header>
    </Header.Provider>
  ),
};

export const Empty: Story = {
  render: () => (
    <Header.Provider tasks={[]}>
      <Header>
        <Header.Content />
      </Header>
    </Header.Provider>
  ),
};

export const CustomLayout: Story = {
  render: () => (
    <Header.Provider tasks={mockTasks.slice(0, 3)}>
      <Header>
        <div className='flex w-full flex-row lg:flex-row lg:gap-11'>
          <div className='relative flex flex-1 flex-col gap-3'>
            <div className='flex items-start justify-between'>
              <Header.Title />
              <Header.TodoStats />
            </div>
            <Header.ProgressBar />
          </div>
          <Header.Character />
        </div>
      </Header>
    </Header.Provider>
  ),
};
