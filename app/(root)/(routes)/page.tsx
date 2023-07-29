'use client';

import { useEffect } from 'react';

import { useStoreModal } from '@/hooks/use-store-modal';

const SetupPage = () => {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [onOpen, isOpen]);

  return null;
};

export default SetupPage;
