import { atom } from 'jotai';

export const createFolderOpenAtom = atom<boolean>(false);
export const isExistAtom = atom<boolean>(false);
export const titleErrorAtom = atom<string>('');
export const dateAtom = atom<Date>(new Date());
export const psotIdAtom = atom<Number>(-1);
export const inputErrorAtom = atom<string>('');
