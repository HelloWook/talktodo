import { useEffect, useState } from 'react';

/**
 * 마운트된 후에는 true를 반환합니다.
 * @returns 마운트된 후에는 true를 반환합니다.
 */

const useMount = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
};

export default useMount;
