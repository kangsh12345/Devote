import { useAtom } from 'jotai';

import { openAtom } from './statusAtoms';

export function usePostSubHeaderAtoms() {
  const [open, setOpen] = useAtom(openAtom);

  return { open, setOpen };
}
