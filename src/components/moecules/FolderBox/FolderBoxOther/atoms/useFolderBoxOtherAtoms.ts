import { useAtom } from 'jotai';

import { mainOpenAtom, treeAtom } from './statusAtoms';

export function useFolderBoxOtherAtoms() {
  const [mainOpen, setMainOpen] = useAtom(mainOpenAtom);
  const [tree, setTree] = useAtom(treeAtom);

  const resetAtom = () => {
    setMainOpen(true);
    setTree({
      path: '',
      name: '',
      type: 'folder',
      children: [],
    });
  };

  return { mainOpen, setMainOpen, resetAtom, tree, setTree };
}
