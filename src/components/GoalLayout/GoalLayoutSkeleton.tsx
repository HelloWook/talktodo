'use client';

/**
 * GoalLayoutSkeleton 컴포넌트
 *
 * 역할: 데이터 로딩 중 GoalLayout의 스켈레톤 UI 표시
 */
const GoalLayoutSkeleton = () => {
  return (
    <>
      {/* GoalNavigator 스켈레톤 */}
      <div className='flex w-full items-center justify-between py-4'>
        <div className='h-10 w-10 animate-pulse rounded-full bg-gray-200' />
        <div className='flex flex-1 flex-col items-center gap-1 px-4'>
          <div className='h-7 w-48 animate-pulse rounded bg-gray-200' />
          <div className='h-4 w-12 animate-pulse rounded bg-gray-200' />
        </div>
        <div className='h-10 w-10 animate-pulse rounded-full bg-gray-200' />
      </div>

      {/* GoalBoard 스켈레톤 */}
      <div className='flex-1 overflow-hidden rounded-2xl bg-white p-6'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='h-7 w-24 animate-pulse rounded bg-gray-200' />
          <div className='h-5 w-16 animate-pulse rounded bg-gray-200' />
        </div>
        <div className='space-y-3'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='rounded-xl border border-gray-200 bg-gray-50 p-4'>
              <div className='flex items-start gap-3'>
                <div className='mt-0.5 h-5 w-5 flex-shrink-0 animate-pulse rounded border-2 border-gray-300 bg-white' />
                <div className='flex-1 space-y-2'>
                  <div className='h-5 w-3/4 animate-pulse rounded bg-gray-200' />
                  <div className='h-4 w-1/2 animate-pulse rounded bg-gray-200' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GoalLayoutSkeleton;
