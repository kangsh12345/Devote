import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGetAllOtherDirectoryMutation } from '@/src/hooks/api/post/useGetAllOtherDirectoryMutation';
import { toast } from 'react-hot-toast';

import { useFolderBoxOtherAtoms } from './atoms/useFolderBoxOtherAtoms';

export function useFolderBoxOther() {
  const { mainOpen, setMainOpen, resetAtom, tree, setTree } =
    useFolderBoxOtherAtoms();

  const pathName = usePathname();
  const path = decodeURIComponent(decodeURIComponent(pathName));
  const dirName = path.split('/')[2];

  const {
    mutate: getAllOtherDirectory,
    data: getAllOtherDirectoryData,
    isLoading: getAllOtherDirectoryLoading,
    error: getAllOtherDirectoryError,
  } = useGetAllOtherDirectoryMutation();

  useEffect(() => {
    if (path.startsWith('/posts/')) {
      getAllOtherDirectory({ path: path.split('/')[2] });
    }
  }, [path]);

  useEffect(() => {
    if (getAllOtherDirectoryData && getAllOtherDirectoryData.success) {
      setTree(getAllOtherDirectoryData.tree);
    }
  }, [getAllOtherDirectoryData, setTree]);

  useEffect(() => {
    if (getAllOtherDirectoryError) {
      toast.error(
        (getAllOtherDirectoryError as Error).message ??
          '파일을 불러오는 중 에러가 발생했습니다',
      );
    }
  }, [getAllOtherDirectoryError]);

  return {
    mainOpen,
    setMainOpen,
    resetAtom,
    tree,
    setTree,
    getAllOtherDirectoryData,
    pathName,
    path,
    dirName,
    getAllOtherDirectoryLoading,
  };
}
