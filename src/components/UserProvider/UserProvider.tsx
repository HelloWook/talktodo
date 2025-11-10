'use client';

import { useEffect } from 'react';

import { useUserStore } from '@/stores/user';

export default function UserProvider() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user');
        const result = await response.json();

        if (result.success && result.data) {
          setUser(result.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, [setUser]);

  return null;
}
