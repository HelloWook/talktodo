import { renderHook } from '@testing-library/react';

import useMount from './useMount';

describe('useMount', () => {
  it('마운트된 후에는 true를 반환한다', () => {
    const { result } = renderHook(() => useMount());
    expect(result.current).toBe(true);
  });
});
