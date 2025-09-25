"use client";

import { useEffect, useState, type ReactNode } from 'react';

interface NoSSRProps {
  children: ReactNode;
}

export default function NoSSR({ children }: NoSSRProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}