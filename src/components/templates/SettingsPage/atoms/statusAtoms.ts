import { atom } from 'jotai';

export const nameErrorAtom = atom<string>('');
export const openNameAtom = atom<boolean>(false);
export const openAuthAtom = atom<boolean>(false);
