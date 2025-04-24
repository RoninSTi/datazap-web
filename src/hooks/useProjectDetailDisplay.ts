'use client';

import { useEffect, useState } from 'react';

import { LOCAL_STORAGE_KEYS } from '@/utils/constants/localStorageKeys';

const useProjectDetailDisplay = () => {
  const [visibleProjectDetailPanes, setVisibleProjectDetailPanes] = useState<
    string[]
  >([]);

  useEffect(() => {
    const valuesFromLocalStorage = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.projectDetailDisplay) || '[]',
    ) as string[];

    setVisibleProjectDetailPanes(valuesFromLocalStorage);
  }, []);

  const toggle = (projectId: string) => {
    const exists = visibleProjectDetailPanes.some((el) => el === projectId);

    const updated = exists
      ? visibleProjectDetailPanes.filter((el) => el !== projectId)
      : [...visibleProjectDetailPanes, projectId];

    setVisibleProjectDetailPanes(updated);

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.projectDetailDisplay,
      JSON.stringify(updated),
    );
  };

  return { visibleProjectDetailPanes, toggle };
};

export { useProjectDetailDisplay };
