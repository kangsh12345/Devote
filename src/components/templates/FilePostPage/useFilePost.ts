/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetFileMutation } from '@/src/hooks/api/post/useGetFileMutation';
import { toast } from 'react-hot-toast';

import { useFilePostAtoms } from './atoms/useFilePostAtoms';

export interface FilePostProps {
  title: string;
  path: string;
}

export function useFilePost({ title, path }: FilePostProps) {
  const {
    isExist,
    setIsExist,
    date,
    setDate,
    md,
    setMd,
    name,
    setName,
    fullPath,
    setFullPath,
  } = useFilePostAtoms();

  const router = useRouter();

  const {
    mutate: getFile,
    data: getFileData,
    error: getFileError,
    isLoading: getFileLoading,
  } = useGetFileMutation();

  useEffect(() => {
    if (title && path) {
      setFullPath(`${path}/${title}`);
    }
  }, [title, path, setFullPath]);

  useEffect(() => {
    if (fullPath !== '') getFile({ path: fullPath });
  }, [fullPath, getFile]);

  useEffect(() => {
    if (
      getFileData &&
      getFileData.exist &&
      getFileData.data &&
      getFileData.data.name &&
      getFileData.data.date
    ) {
      setIsExist(getFileData.exist);
      setName(getFileData.data.name);
      setDate(getFileData.data.date);
      setMd(getFileData.data?.content);
    } else if (!getFileLoading && getFileData && getFileData.exist) {
      router.push('/');
    }
  }, [
    getFileData,
    router,
    setIsExist,
    setName,
    setDate,
    setMd,
    getFileLoading,
  ]);

  useEffect(() => {
    if (getFileError) {
      router.push('/');
      toast.error(
        (getFileError as Error).message ??
          '파일을 불러오다 에러가 발생했습니다',
      );
    }
  }, [getFileError]);

  return {
    isExist,
    setIsExist,
    date,
    setDate,
    md,
    setMd,
    name,
    setName,
    fullPath,
    setFullPath,
    getFileLoading,
  };
}
