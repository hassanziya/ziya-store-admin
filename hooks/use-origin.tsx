'use client';
import { useEffect, useState } from 'react';

export const useOrigin = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window?.location?.origin || '');
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return '';
  }

  return origin;
};
