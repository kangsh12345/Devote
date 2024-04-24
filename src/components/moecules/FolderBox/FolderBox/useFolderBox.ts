import { useEffect } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCreateDirectoryMutation } from '@/src/hooks/api/post/useCreateDirectoryMutation';
import { useGetAllDirectoryQuery } from '@/src/hooks/api/post/useGetAllDirectoryQuery';
import { useRootDirectoryCheckMutation } from '@/src/hooks/api/post/useRootDirectoryCheckMutation';
import { useTree } from '@/src/stores/Tree/useTree';
import { DirectoryTreeProps } from '@/src/utils/fs';
import useInput from '@/src/utils/useInput';
import { toast } from 'react-hot-toast';

import { useFolderBoxAtoms } from './atoms/useFolderBoxAtoms';

export function useFolderBox() {
  const {
    mainOpen,
    setMainOpen,
    createRootFolderOpen,
    setCreateRootFolderOpen,
    createFolderOpen,
    setCreateFolderOpen,
    createFileOpen,
    setCreateFileOpen,
    directory: storeDirectory,
    setDirectory,
    file: storeFile,
    setFile,
    rootDirectory: storeRootDirectory,
    setRootDirectory,
    tree,
    setTree,
    inputError,
    setInputError,
    resetAtom,
  } = useFolderBoxAtoms();
  const { folderPageTree, setFolderPageTree } = useTree();

  const directory = useInput({ initialValue: storeDirectory });
  const file = useInput({ initialValue: storeFile });
  const rootDirectory = useInput({ initialValue: storeRootDirectory });

  const pathName = usePathname();
  const path = decodeURIComponent(decodeURIComponent(pathName));
  const query = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryType = searchParams.get('type');

  const { data: session, status, update } = useSession();

  const queryId = decodeURIComponent(decodeURIComponent(query.id));
  const querySlug = decodeURIComponent(decodeURIComponent(query.slug));

  const querySlugFile =
    queryType === 'file'
      ? querySlug.indexOf('/') === -1
        ? ''
        : querySlug.substring(0, querySlug.lastIndexOf('/'))
      : querySlug;

  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;

  const currentDirectory =
    query.id && queryId === session?.user.dirName && query.slug
      ? querySlugFile === ''
        ? '/'
        : `/${querySlugFile}/...`
      : '/';

  const {
    mutateAsync: rootDirectoryCheck,
    data: rootDirectoryCheckData,
    isLoading: rootDirectoryCheckLoading,
    error: rootDirecotryCheckError,
  } = useRootDirectoryCheckMutation();

  const {
    mutateAsync: createDirectory,
    data: createDirectoryData,
    isLoading: createDirectoryLoading,
    error: createDirectoryerror,
  } = useCreateDirectoryMutation();

  const {
    refetch: getAllDirectory,
    data: getAllDirectoryData,
    isLoading: getAllDirectoryLoading,
    error: getAllDirectoryError,
  } = useGetAllDirectoryQuery();

  const handleCreateRootDirectory = async (
    type: 'rootDirectory' | 'folder' | 'file',
  ) => {
    if (inputError) {
      return;
    }
    if (
      type === 'rootDirectory'
        ? rootDirectory.value === ''
        : type === 'file'
          ? file.value === ''
          : directory.value === ''
    ) {
      setInputError('이름을 입력해주세요');
      return;
    }
    if (
      type === 'rootDirectory'
        ? regex.test(rootDirectory.value) || rootDirectory.value.length > 24
        : type === 'file'
          ? regex.test(file.value) || file.value.length > 24
          : regex.test(directory.value) || directory.value.length > 24
    ) {
      setInputError('올바른 이름을 입력해주세요.');
      return;
    }
    if (session) {
      if (type === 'rootDirectory') {
        const rootDirectoryCheckResponse = await rootDirectoryCheck({
          dirName: rootDirectory.value.trim(),
        });

        if (rootDirectoryCheckResponse && !rootDirectoryCheckResponse.success) {
          return;
        }
      }

      const dirName =
        type === 'rootDirectory'
          ? rootDirectory.value.trim()
          : !query.id || queryId !== session.user.dirName
            ? session.user.dirName +
              '/' +
              (type === 'folder' ? directory.value.trim() : file.value.trim())
            : queryId +
              '/' +
              (query.slug ? (querySlugFile ? `${querySlugFile}/` : '') : '') +
              (type === 'folder' ? directory.value.trim() : file.value.trim());

      const createDirectoryResponse = await createDirectory({
        id: session.user.id,
        name: session.user.name,
        dirName: dirName,
        type: type,
      });

      const checkTreeUpdate =
        queryId + (query.slug ? '/' + querySlug : '') ===
        dirName.replace(/\/[^\/]*$/, '');

      if (
        createDirectoryResponse &&
        !createDirectoryResponse.exist &&
        type === 'rootDirectory' &&
        status === 'authenticated'
      ) {
        const updateValue = rootDirectory.value.trim();
        update({ user: { dirName: updateValue } });
      }

      if (
        createDirectoryResponse &&
        !createDirectoryResponse.exist &&
        checkTreeUpdate
      ) {
        const newFolderPageTreeItem: DirectoryTreeProps = {
          path: dirName + (type === 'file' ? '.md' : ''),
          name:
            (dirName.split('/').at(-1) ?? '') + (type === 'file' ? '.md' : ''),
          type: type === 'file' ? 'file' : 'folder',
          thumbnail: '',
          userName: session.user.name,
          subTitle: '',
          date: String(new Date()),
        };

        const updatedFolderPageTree: DirectoryTreeProps[] = [
          newFolderPageTreeItem,
          ...folderPageTree,
        ].sort((a, b) => {
          if (a.type !== b.type) {
            return a.type === 'folder' ? -1 : 1;
          }

          if (a.name === '자기소개.md' && a.type === 'file') return -1;
          if (b.name === '자기소개.md' && b.type === 'file') return 1;

          const aDate = new Date(a.date);
          const bDate = new Date(b.date);

          return bDate.getTime() - aDate.getTime();
        });

        setFolderPageTree(updatedFolderPageTree);
      }
    }
    setCreateRootFolderOpen(false);
    rootDirectory.setValue('');
  };

  useEffect(() => {
    if (session && session.user.dirName) {
      getAllDirectory();
    }
  }, [session, getAllDirectory]);

  useEffect(() => {
    if (rootDirectoryCheckData && !rootDirectoryCheckData.success) {
      setInputError(rootDirectoryCheckData.message);
    }
  }, [rootDirectoryCheckData, setInputError]);

  useEffect(() => {
    if (rootDirecotryCheckError) {
      toast.error(
        (rootDirecotryCheckError as Error).message ??
          '중복 체크 중 에러가 발생했습니다',
      );
    }
  }, [rootDirecotryCheckError]);

  useEffect(() => {
    if (
      createDirectoryData &&
      createDirectoryData.message === 'create success'
    ) {
      toast.success('파일이 생성되었습니다');
      resetAtom();
      directory.setValue('');
      file.setValue('');
      rootDirectory.setValue('');
      getAllDirectory();
    }

    if (
      createDirectoryData &&
      createDirectoryData.message === 'already exists'
    ) {
      setInputError('동일 경로에 같은 이름의 폴더/파일을 생성할 수 없습니다.');
    }

    if (createDirectoryData && createDirectoryData.message === 'valid false') {
      setInputError('올바른 이름을 입력해주세요.');
    }
  }, [createDirectoryData, getAllDirectory]);

  useEffect(() => {
    if (createDirectoryerror) {
      toast.error(
        (createDirectoryerror as Error).message ??
          '파일 생성 중 에러가 발생했습니다',
      );
    }
  }, [createDirectoryerror]);

  useEffect(() => {
    if (
      getAllDirectoryData &&
      getAllDirectoryData.success &&
      getAllDirectoryData.message === 'success'
    ) {
      setTree(
        getAllDirectoryData.tree ?? {
          path: '',
          name: '',
          type: 'folder',
          createdAt: new Date(),
          children: [],
        },
      );
    }
  }, [getAllDirectoryData, setTree]);

  useEffect(() => {
    if (getAllDirectoryError) {
      toast.error(
        (getAllDirectoryError as Error).message ??
          '파일 생성 중 에러가 발생했습니다',
      );
    }
  }, [getAllDirectoryError]);

  useEffect(() => {
    if (
      path.startsWith('/posts/') &&
      session &&
      session.user.dirName !== queryId
    ) {
      setMainOpen(false);
    } else if (
      path.startsWith('/posts/') &&
      session &&
      session.user.dirName === queryId
    ) {
      setMainOpen(true);
    }
  }, []);

  return {
    mainOpen,
    setMainOpen,
    createRootFolderOpen,
    setCreateRootFolderOpen,
    createFolderOpen,
    setCreateFolderOpen,
    createFileOpen,
    setCreateFileOpen,
    storeDirectory,
    setDirectory,
    storeFile,
    setFile,
    storeRootDirectory,
    setRootDirectory,
    tree,
    setTree,
    inputError,
    setInputError,
    resetAtom,
    directory,
    file,
    rootDirectory,
    router,
    query,
    searchParams,
    queryType,
    session,
    status,
    update,
    queryId,
    querySlug,
    querySlugFile,
    regex,
    currentDirectory,
    rootDirectoryCheckLoading,
    createDirectoryLoading,
    getAllDirectoryLoading,
    handleCreateRootDirectory,
  };
}
