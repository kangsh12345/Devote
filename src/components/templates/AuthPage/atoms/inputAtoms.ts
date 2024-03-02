import { atom } from 'jotai';

// export const periodAtom = atom<string>('');

// export const quotationAtom = atom<
//   Array<{
//     id: number;
//     checked: boolean;
//     reason: string;
//     amount: number;
//     price: string;
//   }>
// >([]);

export const nameAtom = atom<string>('');
export const emailAtom = atom<string>('');
export const passwordAtom = atom<string>('');
export const passwordCheckAtom = atom<string>('');
export const nameErrorAtom = atom<string>('');
export const emailErrorAtom = atom<string>('');
export const passwordErrorAtom = atom<string>('');
export const passwordCheckErrorAtom = atom<string>('');
