import { TreeProps } from '@/src/utils/fs';
import { atom } from 'jotai';

export const mainOpenAtom = atom<boolean>(true);
export const createRootFolerOpenAtom = atom<boolean>(false);
export const createFolderOpenAtom = atom<boolean>(false);
export const createFIleOpenAtom = atom<boolean>(false);
export const treeAtom = atom<TreeProps>({
  path: '',
  name: '',
  type: 'folder',
  children: [],
});
export const inputErrorAtom = atom<string>('');
