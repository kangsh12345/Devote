import { DirectoryTreeProps } from '@/src/utils/fs';
import { atom } from 'jotai';

export const folderPageTreeAtom = atom<DirectoryTreeProps[]>([]);
