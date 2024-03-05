import { useEffect } from 'react';
import { useGetRecentPostQuery } from '@/src/hooks/api/post/useGetRecentPostQuery';
import { toast } from 'react-hot-toast';

import { useRecentPostAtoms } from './atoms/useRecentPostAtoms';

export function useRecentPost() {
  const { tree, setTree } = useRecentPostAtoms();

  const { data, error, isLoading } = useGetRecentPostQuery();

  useEffect(() => {
    if (data && data.success) {
      setTree(data.tree);
    }
  }, [data, setTree]);

  useEffect(() => {
    if (error) {
      toast.error(
        (error as Error).message ?? '파일을 불러오다 에러가 발생했습니다',
      );
    }
  });

  return { tree, setTree, data, error, isLoading };
}
