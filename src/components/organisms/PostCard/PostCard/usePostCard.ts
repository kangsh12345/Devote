/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useExistCheckMutation } from '@/src/hooks/api/post/useExistCheckMutation';
import { useRemoveFileMutation } from '@/src/hooks/api/post/useRemoveFileMutation';
import { useRenameMutation } from '@/src/hooks/api/post/useRenameMutation';
import { useTree } from '@/src/stores/Tree/useTree';
import { useClickOutside } from '@/src/utils/useClickOutside';
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
  const { folderPageTree: tree, setFolderPageTree: setTree } = useTree();
  const handleClose = () => {
    if (!modfiyOpen && !deleteOpen) props.setIsOpen(false);
  };

  const domNodeRef = useClickOutside<HTMLDivElement>(handleClose);

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

  let submitLoading = false;

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
    submitLoading = true;

    if (inputError) {
      submitLoading = false;
      return;
    }
    if (!folderName.value) {
      submitLoading = false;
      setInputError('이름을 입력해주세요');
      return;
    }

    if (regex.test(folderName.value) || folderName.value.length > 24) {
      submitLoading = false;
      setInputError('올바른 이름을 입력해주세요.');
      return;
    }

    const reqPath =
      `${props.path.replace(/[^\/]*$/, '') + folderName.value}` +
      (type === 'file' ? '.md' : '');

    if (props.own && folderName.value !== name) {
      const existCheckResponse = await existCheck({ path: reqPath });

      if (existCheckResponse && existCheckResponse.exist) {
        submitLoading = false;
        setInputError('동일 경로 같은 파일 존재');
        return;
      }
    } else {
      submitLoading = false;
      return;
    }

    if (props.own && !inputError && folderName.value) {
      rename({ path: props.path, newPath: reqPath });
    }

    submitLoading = false;
  };

  useEffect(() => {
    resetAtom();
  }, []);

  useEffect(() => {
    if (removeFileData && removeFileData.success) {
      toast.success(removeFileData.message);
      setTree(tree.filter(item => item.path !== props.path));
    }
    props.setIsOpen(false);
    resetAtom();
  }, [removeFileData]);

  useEffect(() => {
    if (renameData && renameData.success) {
      toast.success(renameData.message);
      const changeTree = tree.map(item => {
        if (item.path === props.path) {
          item.path =
            `${props.path.replace(/[^\/]*$/, '') + folderName.value}` +
            (item.type === 'file' ? '.md' : '');
          item.name = folderName.value;
        }
        return item;
      });
      setTree(changeTree);
    }
    props.setIsOpen(false);
    resetAtom();
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
    existCheckData,
    existCheckLoading,
    renameLoading,
    handleDeleteFolder,
    handleModifyFolder,
    domNodeRef,
    submitLoading,
  };
}
