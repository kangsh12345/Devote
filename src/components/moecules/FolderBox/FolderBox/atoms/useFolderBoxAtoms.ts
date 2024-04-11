import { useAtom } from 'jotai';

import { directoryAtom, fileAtom, rootDirectoryAtom } from './inputAtoms';
import {
  createFIleOpenAtom,
  createFolderOpenAtom,
  createRootFolerOpenAtom,
  inputErrorAtom,
  mainOpenAtom,
  treeAtom,
} from './statusAtoms';

export function useFolderBoxAtoms() {
  const [mainOpen, setMainOpen] = useAtom(mainOpenAtom);
  const [createRootFolderOpen, setCreateRootFolderOpen] = useAtom(
    createRootFolerOpenAtom,
  );
  const [createFolderOpen, setCreateFolderOpen] = useAtom(createFolderOpenAtom);
  const [createFileOpen, setCreateFileOpen] = useAtom(createFIleOpenAtom);
  const [directory, setDirectory] = useAtom(directoryAtom);
  const [file, setFile] = useAtom(fileAtom);
  const [rootDirectory, setRootDirectory] = useAtom(rootDirectoryAtom);
  const [tree, setTree] = useAtom(treeAtom);
  const [inputError, setInputError] = useAtom(inputErrorAtom);

  const resetAtom = () => {
    setMainOpen(true);
    setCreateRootFolderOpen(false);
    setCreateFolderOpen(false);
    setCreateFileOpen(false);
    setDirectory('');
    setFile('');
    setRootDirectory('');
    setTree({
      path: '',
      name: '',
      type: 'folder',
      createdAt: new Date(),
      children: [],
    });
    setInputError('');
  };

  return {
    mainOpen,
    setMainOpen,
    createRootFolderOpen,
    setCreateRootFolderOpen,
    createFolderOpen,
    setCreateFolderOpen,
    createFileOpen,
    setCreateFileOpen,
    directory,
    setDirectory,
    file,
    setFile,
    rootDirectory,
    setRootDirectory,
    tree,
    setTree,
    inputError,
    setInputError,
    resetAtom,
  };
}
