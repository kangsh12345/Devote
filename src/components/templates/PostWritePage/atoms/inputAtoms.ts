import { atom } from 'jotai';

export const titleAtom = atom<string>('');
export const subtitleAtom = atom<string>('');
export const mdAtom = atom<string | undefined>('');
