'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useGetDirectoryMutation } from '@/src/hooks/api/post/useGetDirectoryMutation';
import { useTree } from '@/src/stores/Tree/useTree';
import { toast } from 'react-hot-toast';

import { useFolderPostAtoms } from './atoms/useFolderPostAtoms';

export function useFolderPost() {
  const { userName, setUserName, hover, setHover, isOpen, setIsOpen } =
    useFolderPostAtoms();

  const { folderPageTree: tree, setFolderPageTree: setTree } = useTree();

  const { data: session } = useSession();

  const pathName = usePathname();
  const path = decodeURIComponent(decodeURIComponent(pathName));
  const pathArray = path.split('/');
  const pathBack = pathArray.slice(2, -1).join('/');

  const {
    mutate: getDirectory,
    data: getDirectoryData,
    error: getDirectoryError,
    isLoading: getDirectoryLoading,
  } = useGetDirectoryMutation();

  useEffect(() => {
    if (path.startsWith('/posts/')) {
      getDirectory({ path: path.replace('/posts/', '') });
    }
  }, [path, getDirectory]);

  useEffect(() => {
    if (getDirectoryData) {
      if (!getDirectoryData.success) return;
      setTree(getDirectoryData.tree ?? []);
      setUserName(getDirectoryData.userName ?? '');
    }
  }, [getDirectoryData, setTree, setUserName]);

  useEffect(() => {
    if (getDirectoryError) {
      toast.error(
        (getDirectoryError as Error).message ??
          '폴더를 불러오다 에러가 발생했습니다',
      );
    }
  }, [getDirectoryError]);

  return {
    tree,
    setTree,
    userName,
    setUserName,
    hover,
    setHover,
    isOpen,
    setIsOpen,
    getDirectoryLoading,
    pathBack,
    path,
    pathArray,
    session,
  };
}
