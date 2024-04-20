import { DirectoryTreeProps } from '@/src/utils/fs';
import { atom } from 'jotai';

export const treeAtom = atom<DirectoryTreeProps[]>([]);
