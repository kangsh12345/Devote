import { useAtom } from 'jotai';

import { treeAtom } from './statusAtoms';

export function useRecentPostAtoms() {
  const [tree, setTree] = useAtom(treeAtom);

  return { tree, setTree };
}
