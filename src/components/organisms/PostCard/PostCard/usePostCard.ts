import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useExistCheckMutation } from '@/src/hooks/api/post/useExistCheckMutation';
import { useRemoveFileMutation } from '@/src/hooks/api/post/useRemoveFileMutation';
import { useRenameMutation } from '@/src/hooks/api/post/useRenameMutation';
import useInput from '@/src/utils/useInput';
import { toast } from 'react-hot-toast';

import { usePostCardAtoms } from './atoms/usePostCardAtoms';
import { PostCardProps } from './PostCard';

export function usePostCard(props: PostCardProps) {
  const {
    modfiyOpen,
    setModifyOpen,
    deleteOpen,
    setDeleteOpen,
    folderName: storeFolderName,
    setFolderName,
    inputError,
    setInputError,
    resetAtom,
  } = usePostCardAtoms();

  const folderName = useInput({ initialValue: storeFolderName });

  const router = useRouter();
  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;

  const direction = props.direction === undefined ? 'row' : props.direction;
  const variant = props.variant;
  const mvPath =
    variant === 'folder'
      ? `/posts/${props.path}`
      : `/posts/${props.path?.replace(/\/([^\/]*)$/, '?title=$1')}`;

  const thumnail = props.thumbnail ?? '';

  const imageUrl = thumnail === '' ? '/image/NoPhoto.png' : thumnail;

  const {
    mutate: removeFile,
    data: removeFileData,
    isLoading: removeFileLoading,
    error: removeFileError,
  } = useRemoveFileMutation();

  const {
    mutateAsync: existCheck,
    data: existCheckData,
    isLoading: existCheckLoading,
    error: existCheckError,
  } = useExistCheckMutation();

  const {
    mutate: rename,
    data: renameData,
    isLoading: renameLoading,
    error: renameError,
  } = useRenameMutation();

  const handleDeleteFolder = async (type: 'folder' | 'file') => {
    if (props.own) {
      removeFile({ path: props.path, type });
    }
  };

  const handleModifyFolder = async (name: string, type: string) => {
    if (inputError) {
      return;
    }
    if (!folderName.value) {
      setInputError('이름을 입력해주세요');
      return;
    }

    if (regex.test(folderName.value) || folderName.value.length > 24) {
      setInputError('올바른 이름을 입력해주세요.');
      return;
    }

    const reqPath =
      `${props.path.replace(/[^\/]*$/, '') + folderName.value}` +
      (type === 'file' ? '.md' : '');

    if (props.own && folderName.value !== name) {
      await existCheck({ path: reqPath });

      if (existCheckData && existCheckData.exist) {
        setInputError('동일 경로 같은 파일 존재');
        return;
      }
    } else {
      return;
    }

    if (props.own && !inputError && folderName.value) {
      rename({ path: props.path, newPath: reqPath });
    }
  };

  useEffect(() => {
    resetAtom();
  }, []);

  useEffect(() => {
    if (removeFileData && removeFileData.success) {
      toast.success('파일이 삭제 되었습니다');
    }
  }, [removeFileData]);

  useEffect(() => {
    if (renameData && renameData.success) {
      toast.success('파일 이름이 변경 되었습니다');
    }
  }, [renameData]);

  useEffect(() => {
    if (removeFileError) {
      toast.error(
        (removeFileError as Error).message ??
          '파일 삭제하는 도중 에러가 발생했습니다.',
      );
    }
  }, [removeFileError]);

  useEffect(() => {
    if (existCheckError) {
      toast.error(
        (existCheckError as Error).message ??
          '파일 삭제하는 도중 에러가 발생했습니다.',
      );
    }
  }, [existCheckError]);

  useEffect(() => {
    if (renameError) {
      toast.error(
        (renameError as Error).message ??
          '파일 이름 변경 도중 에러가 발생했습니다.',
      );
    }
  }, [renameError]);

  return {
    modfiyOpen,
    setModifyOpen,
    deleteOpen,
    setDeleteOpen,
    storeFolderName,
    setFolderName,
    inputError,
    setInputError,
    resetAtom,
    folderName,
    router,
    regex,
    direction,
    variant,
    mvPath,
    thumnail,
    imageUrl,
    removeFileLoading,
    existCheckLoading,
    renameLoading,
    handleDeleteFolder,
    handleModifyFolder,
  };
}
