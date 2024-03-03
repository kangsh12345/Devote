import { DirectoryTreeProps } from '@/src/utils/fs';
import { atom } from 'jotai';

export const treeAtom = atom<DirectoryTreeProps[]>([]);
export const useNameAtom = atom<string>('');
export const hoverAtom = atom<number>(-1);
export const isOpenAtom = atom<boolean>(false);
