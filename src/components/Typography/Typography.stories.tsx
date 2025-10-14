import { Meta, StoryObj } from '@storybook/nextjs-vite';

import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Pretendard 폰트를 기반으로 한 타이포그래피 디자인 시스템입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'count-bold',
        'title1-bold',
        'title1-semibold',
        'title2-bold',
        'title2-semibold',
        'title3-bold',
        'title3-semibold',
        'body1-bold',
        'body1-semibold',
        'body1-medium',
        'body1-regular',
        'body2-bold',
        'body2-semibold',
        'body2-medium-tight',
        'body2-medium-loose',
        'body2-regular',
        'body3-bold',
        'body3-semibold',
        'body3-medium-tight',
        'body3-medium-loose',
        'body3-regular',
        'caption-bold',
        'caption-semibold',
        'caption-medium',
        'caption-regular',
        'date-large',
        'date-small',
      ],
      description: '타이포그래피 스타일 변형',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
      description: 'HTML 태그',
    },
    children: {
      control: 'text',
      description: '텍스트 내용',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    variant: 'body1-regular',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

// Count 스토리
export const Count: Story = {
  args: {
    variant: 'count-bold',
    children: '1,2,3,4,5,6,7,8,9,10',
    as: 'span',
  },
};

// Title1 스토리들
export const Title1Bold: Story = {
  args: {
    variant: 'title1-bold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'h1',
  },
};

export const Title1Semibold: Story = {
  args: {
    variant: 'title1-semibold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'h1',
  },
};

// Title2 스토리들
export const Title2Bold: Story = {
  args: {
    variant: 'title2-bold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'h2',
  },
};

export const Title2Semibold: Story = {
  args: {
    variant: 'title2-semibold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'h2',
  },
};

// Title3 스토리들
export const Title3Bold: Story = {
  args: {
    variant: 'title3-bold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'h3',
  },
};

export const Title3Semibold: Story = {
  args: {
    variant: 'title3-semibold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'h3',
  },
};

// Body1 스토리들
export const Body1Bold: Story = {
  args: {
    variant: 'body1-bold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body1Semibold: Story = {
  args: {
    variant: 'body1-semibold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body1Medium: Story = {
  args: {
    variant: 'body1-medium',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body1Regular: Story = {
  args: {
    variant: 'body1-regular',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

// Body2 스토리들
export const Body2Bold: Story = {
  args: {
    variant: 'body2-bold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body2Semibold: Story = {
  args: {
    variant: 'body2-semibold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body2MediumTight: Story = {
  args: {
    variant: 'body2-medium-tight',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body2MediumLoose: Story = {
  args: {
    variant: 'body2-medium-loose',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body2Regular: Story = {
  args: {
    variant: 'body2-regular',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

// Body3 스토리들
export const Body3Bold: Story = {
  args: {
    variant: 'body3-bold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body3Semibold: Story = {
  args: {
    variant: 'body3-semibold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body3MediumTight: Story = {
  args: {
    variant: 'body3-medium-tight',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body3MediumLoose: Story = {
  args: {
    variant: 'body3-medium-loose',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

export const Body3Regular: Story = {
  args: {
    variant: 'body3-regular',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'p',
  },
};

// Caption 스토리들
export const CaptionBold: Story = {
  args: {
    variant: 'caption-bold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'span',
  },
};

export const CaptionSemibold: Story = {
  args: {
    variant: 'caption-semibold',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'span',
  },
};

export const CaptionMedium: Story = {
  args: {
    variant: 'caption-medium',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'span',
  },
};

export const CaptionRegular: Story = {
  args: {
    variant: 'caption-regular',
    children: '톡톡 가볍게, 당신의 할일을 말해보세요',
    as: 'span',
  },
};

// Date 스토리들
export const DateLarge: Story = {
  args: {
    variant: 'date-large',
    children: '1,2,3,4,5,6,7,8,9,10',
    as: 'span',
  },
};

export const DateSmall: Story = {
  args: {
    variant: 'date-small',
    children: '1,2,3,4,5,6,7,8,9,10',
    as: 'span',
  },
};

// 모든 타이포그래피를 보여주는 통합 스토리
export const AllVariants: Story = {
  render: () => (
    <div className='space-y-8'>
      {/* Count */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Count</h3>
        <div className='rounded-lg border bg-gray-50 p-4'>
          <Typography variant='count-bold'>1,2,3,4,5,6,7,8,9,10</Typography>
        </div>
      </div>

      {/* Title1 */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Title1</h3>
        <div className='space-y-2'>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='title1-bold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='title1-semibold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
        </div>
      </div>

      {/* Title2 */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Title2</h3>
        <div className='space-y-2'>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='title2-bold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='title2-semibold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
        </div>
      </div>

      {/* Title3 */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Title3</h3>
        <div className='space-y-2'>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='title3-bold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='title3-semibold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
        </div>
      </div>

      {/* Body1 */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Body1</h3>
        <div className='space-y-2'>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body1-bold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body1-semibold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body1-medium'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body1-regular'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
        </div>
      </div>

      {/* Body2 */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Body2</h3>
        <div className='space-y-2'>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body2-bold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body2-semibold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body2-medium-tight'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body2-medium-loose'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body2-regular'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
        </div>
      </div>

      {/* Body3 */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Body3</h3>
        <div className='space-y-2'>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body3-bold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body3-semibold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body3-medium-tight'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body3-medium-loose'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='body3-regular'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Caption</h3>
        <div className='space-y-2'>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='caption-bold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='caption-semibold'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='caption-medium'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='caption-regular'>톡톡 가볍게, 당신의 할일을 말해보세요</Typography>
          </div>
        </div>
      </div>

      {/* Date */}
      <div className='space-y-2'>
        <h3 className='text-lg font-semibold'>Date</h3>
        <div className='space-y-2'>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='date-large'>1,2,3,4,5,6,7,8,9,10</Typography>
          </div>
          <div className='rounded-lg border bg-gray-50 p-4'>
            <Typography variant='date-small'>1,2,3,4,5,6,7,8,9,10</Typography>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 타이포그래피 변형을 한 번에 볼 수 있습니다.',
      },
    },
  },
};

// 실제 사용 예시 스토리
export const UsageExample: Story = {
  render: () => (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <Typography variant='title1-bold' as='h1'>
          톡톡 가볍게, 당신의 할일을 말해보세요
        </Typography>
        <Typography variant='body1-regular' as='p'>
          이 앱은 Pretendard 폰트를 사용하여 일관된 타이포그래피를 제공합니다.
        </Typography>
      </div>

      <div className='space-y-4'>
        <Typography variant='title2-semibold' as='h2'>
          주요 기능
        </Typography>
        <ul className='space-y-2'>
          <li>
            <Typography variant='body2-regular' as='span'>
              • 음성 인식으로 할일 추가
            </Typography>
          </li>
          <li>
            <Typography variant='body2-regular' as='span'>
              • 스마트 카테고리 분류
            </Typography>
          </li>
          <li>
            <Typography variant='body2-regular' as='span'>
              • 우선순위 자동 설정
            </Typography>
          </li>
        </ul>
      </div>

      <div className='space-y-4'>
        <Typography variant='title3-bold' as='h3'>
          시작하기
        </Typography>
        <Typography variant='body2-regular' as='p'>
          마이크 버튼을 눌러서 할일을 말해보세요. AI가 자동으로 분류하고 관리해드립니다.
        </Typography>
        <Typography variant='caption-regular' as='p'>
          * 인터넷 연결이 필요합니다.
        </Typography>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 앱에서 사용될 수 있는 타이포그래피 조합 예시입니다.',
      },
    },
  },
};
