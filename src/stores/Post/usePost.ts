import { useAtom } from 'jotai';

import { isActiveAtom } from './atoms';

export function usePost() {
  const [isActive, setIsActive] = useAtom(isActiveAtom);

  return { isActive, setIsActive };
}
