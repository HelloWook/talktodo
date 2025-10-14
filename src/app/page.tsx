import ColorPalette from '@/components/Color/ColorPalette';
import Typography from '@/components/Typography/Typography';

export default function Home() {
  return (
    <div className='min-h-screen space-y-8 p-8'>
      <div className='mx-auto max-w-6xl space-y-12'>
        {/* 헤더 섹션 */}
        <header className='space-y-4 text-center'>
          <Typography variant='title1-bold' as='h1'>
            톡톡 가볍게, 당신의 할일을 말해보세요
          </Typography>
          <Typography variant='body1-regular' as='p'>
            Pretendard 폰트와 컬러 시스템을 활용한 디자인 시스템
          </Typography>
        </header>

        {/* 컬러 시스템 섹션 */}
        <section className='space-y-8'>
          <Typography variant='title2-bold' as='h2'>
            컬러 시스템
          </Typography>

          {/* Purple 팔레트 */}
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Purple Scale
            </Typography>
            <ColorPalette
              title=''
              colors={[
                'purple-50',
                'purple-100',
                'purple-150',
                'purple-200',
                'purple-300',
                'purple-400',
                'purple-500',
                'purple-600',
                'purple-700',
                'purple-800',
                'purple-900',
              ]}
            />
          </div>

          {/* Gray 팔레트 */}
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Gray Scale
            </Typography>
            <ColorPalette
              title=''
              colors={['gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500', 'gray-600', 'gray-700', 'gray-800', 'gray-900']}
            />
          </div>

          {/* White */}
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              White
            </Typography>
            <ColorPalette title='' colors={['white']} />
          </div>
        </section>

        {/* 타이포그래피 예시 섹션 */}
        <section className='space-y-8'>
          <Typography variant='title2-bold' as='h2'>
            타이포그래피 시스템
          </Typography>

          {/* Count */}
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Count
            </Typography>
            <div className='rounded-lg border bg-gray-50 p-4'>
              <Typography variant='count-bold'>1,2,3,4,5,6,7,8,9,10</Typography>
            </div>
          </div>

          {/* Title1 */}
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Title1
            </Typography>
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
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Title2
            </Typography>
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
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Title3
            </Typography>
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
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Body1
            </Typography>
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
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Body2
            </Typography>
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
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Body3
            </Typography>
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
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Caption
            </Typography>
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
          <div className='space-y-4'>
            <Typography variant='title3-semibold' as='h3'>
              Date
            </Typography>
            <div className='space-y-2'>
              <div className='rounded-lg border bg-gray-50 p-4'>
                <Typography variant='date-large'>1,2,3,4,5,6,7,8,9,10</Typography>
              </div>
              <div className='rounded-lg border bg-gray-50 p-4'>
                <Typography variant='date-small'>1,2,3,4,5,6,7,8,9,10</Typography>
              </div>
            </div>
          </div>
        </section>

        {/* 사용법 섹션 */}
        <section className='space-y-4'>
          <Typography variant='title2-bold' as='h2'>
            사용법
          </Typography>
          <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
            <Typography variant='body2-regular' as='p' className='mb-4'>
              Typography 컴포넌트와 컬러 시스템을 사용하여 일관된 디자인을 적용할 수 있습니다.
            </Typography>
            <pre className='overflow-x-auto rounded bg-gray-100 p-4 text-sm'>
              <code>{`import Typography from '@/components/Typography/Typography';
import ColorPalette from '@/components/Color/ColorPalette';

// 타이포그래피 사용
<Typography variant="title1-bold" as="h1">
  제목 텍스트
</Typography>

// 컬러 팔레트 사용
<ColorPalette
  title="Purple Scale"
  colors={['purple-600', 'purple-500', 'purple-400']}
/>

// CSS 클래스 직접 사용
<div className="bg-purple-600 text-white p-4">
  컬러 적용된 요소
</div>`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
