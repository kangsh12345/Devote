import { TreeProps } from '@/src/utils/fs';
import { atom } from 'jotai';

export const mainOpenAtom = atom<boolean>(true);
export const treeAtom = atom<TreeProps>({
  path: '',
  name: '',
  type: 'folder',
  children: [],
});
