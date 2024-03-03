import { atom } from 'jotai';

export const isExistAtom = atom<boolean>(false);
export const dateAtom = atom<Date>(new Date());
export const mdAtom = atom<string | undefined>('');
export const nameAtom = atom<string>('');
export const fullPathAtom = atom<string>('');
