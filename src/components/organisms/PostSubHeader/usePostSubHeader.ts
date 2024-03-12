import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRemoveFileMutation } from '@/src/hooks/api/post/useRemoveFileMutation';
import { toast } from 'react-hot-toast';

import { usePostSubHeaderAtoms } from './atoms/usePostSubHeaderAtoms';

export interface PostSubHeaderProps {
  path: string;
}

export function usePostSubHeader({ path }: PostSubHeaderProps) {
  const { open, setOpen } = usePostSubHeaderAtoms();

  const router = useRouter();
  const { data: session } = useSession();

  const {
    mutate: removeFile,
    data: removeFileData,
    isLoading: removeFileLoading,
    error: removeFileError,
  } = useRemoveFileMutation();

  const handleRemoveFile = async () => {
    if (session?.user.dirName === path.split('/', 1)[0]) {
      removeFile({ path: `${path}.md`, type: 'file' });
    }
  };

  useEffect(() => {
    if (removeFileData && removeFileData.success) {
      const to = `/posts/${path.replace(/\/[^\/]*$/, '')}`;
      router.push(to);
      toast.success('파일이 삭제되었습니다');
    }
    setOpen(false);
  }, [removeFileData]);

  useEffect(() => {
    if (removeFileError) {
      toast.error(
        (removeFileError as Error).message ??
          '파일을 삭제하는 도중에 에러가 발생했습니다',
      );
    }
  }, [removeFileError]);

  return {
    open,
    setOpen,
    router,
    session,
    removeFileLoading,
    handleRemoveFile,
  };
}
