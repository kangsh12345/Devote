import { ChangeEvent, MouseEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useExistCheckMutation } from '@/src/hooks/api/post/useExistCheckMutation';
import { useGetFileMutation } from '@/src/hooks/api/post/useGetFileMutation';
import { usePostWriteMutation } from '@/src/hooks/api/post/usePostWriteMutation';
import useInput from '@/src/utils/useInput';
import { markdownToTxt } from 'markdown-to-txt';
import { toast } from 'react-hot-toast';

import { usePostWriteAtoms } from './atoms/usePostWriteAtoms';

export function usePostWrite() {
  const {
    createFolderOpen,
    setCreateFolderOpen,
    inputError,
    setInputError,
    isExist,
    setIsExist,
    title: storeTitle,
    setTitle,
    subtitle: storeSubtitle,
    setSubtitle,
    titleError,
    setTitleError,
    date,
    setDate,
    md: storeMd,
    setMd,
    postId,
    setPostId,
    resetAtom,
  } = usePostWriteAtoms();

  const router = useRouter();
  const { data: session } = useSession();

  const query = useSearchParams();
  const path = query.get('path') ?? '';

  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;
  const urlRegex = /!\[.*?\]\((.*?)\)/;

  const specialRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  const doublespaceRegex = /\s\s+/g;

  const lastSlashIndex = path.lastIndexOf('/');
  const filePath = path.substring(0, lastSlashIndex + 1);
  const fileTitle = path.substring(lastSlashIndex + 1);

  const userImage = session?.user.image;
  const userDirname = session?.user.dirName;

  const own = userDirname === filePath.split('/')[0];

  const title = useInput({ initialValue: fileTitle });
  const subtitle = useInput({ initialValue: storeSubtitle });
  const md = useInput({ initialValue: storeMd });
  let submitLoading = false;

  const {
    mutateAsync: existCheck,
    data: existCheckData,
    isLoading: existCheckLoading,
    error: existCheckError,
  } = useExistCheckMutation();

  const {
    mutate: postWrite,
    data: postWriteData,
    isLoading: postWriteLoading,
    error: postWriteError,
  } = usePostWriteMutation();

  const {
    mutate: getFile,
    data: getFileData,
    error: getFileError,
    isLoading: getFileLoading,
  } = useGetFileMutation();

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    submitLoading = true;

    const match: RegExpExecArray | null = urlRegex.exec(md.value ?? '');
    const thumbnail = match ? match[1] : '';

    const subTitle =
      subtitle.value === ''
        ? md.value
          ? markdownToTxt(md.value as string).substring(0, 120)
          : ''
        : subtitle.value;

    if (titleError) {
      submitLoading = false;
      return;
    }

    if (!title.value) {
      submitLoading = false;
      setTitleError('이름을 입력해주세요');
      return;
    }

    if (regex.test(title.value) || title.value.length > 24) {
      submitLoading = false;
      setTitleError('올바른 이름을 입력해주세요.');
      return;
    }

    // 여기부터 같은 동선상 exist 체크
    if (session && title.value !== fileTitle) {
      const existCheckResult = await existCheck({
        path: filePath + title.value + '.md',
      });

      if (
        existCheckResult &&
        !existCheckResult.exist &&
        !titleError &&
        title.value
      ) {
        postWrite({
          id: postId,
          path,
          newPath: filePath + title.value,
          thumbnail,
          title: title.value,
          subTitle,
          md: md.value,
          date,
        });
      }
    } else if (title.value && title.value === fileTitle && !titleError) {
      postWrite({
        id: postId,
        path,
        newPath: filePath + title.value,
        thumbnail,
        title: title.value,
        subTitle,
        md: md.value,
        date,
      });
    }

    submitLoading = false;
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    title.setValue(
      e.target.value.replace(doublespaceRegex, ' ').replace(specialRegex, ''),
    );
    if (titleError !== '') {
      setTitleError('');
    }
  };

  useEffect(() => {
    if (existCheckData && existCheckData.exist) {
      toast.error('동일 경로 같은 파일 존재');
      setTitleError('동일 경로 같은 파일 존재');
      setCreateFolderOpen(false);
    }
  }, [existCheckData]);

  useEffect(() => {
    if (existCheckError) {
      toast.error(
        (existCheckError as Error).message ?? '알 수 없는 에러가 발생했습니다',
      );
    }
  }, [existCheckError]);

  useEffect(() => {
    resetAtom();
    if (fileTitle !== '' && path !== '')
      own ? getFile({ path: path }) : router.push('/');
  }, []);

  useEffect(() => {
    if (postWriteData && postWriteData.success) {
      toast.success('글 생성이 완료되었습니다.');
      router.push(`/posts/${filePath}?title=${title.value}`);
    }
  }, [postWriteData]);

  useEffect(() => {
    if (postWriteError) {
      toast.error(
        (postWriteError as Error).message ?? '글 생성 중 오류가 발생했습니다',
      );
    }
  }, [postWriteError]);

  useEffect(() => {
    if (
      getFileData &&
      getFileData.success &&
      getFileData.data &&
      getFileData.data.postId &&
      getFileData.exist
    ) {
      setIsExist(getFileData.exist);
      setPostId(getFileData.data.postId);
      setDate(getFileData.data.date);
      md.setValue(getFileData.data.content);
      subtitle.setValue(getFileData.data.subTitle ?? '');
    }
  }, [getFileData, setIsExist, setPostId, setDate]);

  useEffect(() => {
    if (getFileError) {
      toast.error(
        (getFileError as Error).message ??
          '파일을 불러오다 에러가 발생했습니다',
      );
      router.push('/');
    }
  }, [getFileError, router]);

  return {
    createFolderOpen,
    setCreateFolderOpen,
    inputError,
    setInputError,
    isExist,
    setIsExist,
    storeTitle,
    setTitle,
    storeSubtitle,
    setSubtitle,
    titleError,
    setTitleError,
    date,
    setDate,
    storeMd,
    setMd,
    postId,
    setPostId,
    router,
    session,
    query,
    path,
    regex,
    urlRegex,
    specialRegex,
    doublespaceRegex,
    lastSlashIndex,
    filePath,
    fileTitle,
    userImage,
    userDirname,
    own,
    title,
    subtitle,
    md,
    handleClick,
    handleInput,
    existCheck,
    existCheckData,
    existCheckLoading,
    existCheckError,
    postWrite,
    postWriteData,
    postWriteLoading,
    postWriteError,
    getFile,
    getFileData,
    getFileError,
    getFileLoading,
    submitLoading,
  };
}
