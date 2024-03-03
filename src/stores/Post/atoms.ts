import { atom } from 'jotai';

export const isActiveAtom = atom<'row' | 'column'>('row');
