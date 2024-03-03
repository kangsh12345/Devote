import { useAtom } from 'jotai';

import { hoverAtom, isOpenAtom, treeAtom, useNameAtom } from './statusAtoms';

export function useFolderPostAtoms() {
  const [tree, setTree] = useAtom(treeAtom);
  const [userName, setUserName] = useAtom(useNameAtom);
  const [hover, setHover] = useAtom(hoverAtom);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);

  return {
    tree,
    setTree,
    userName,
    setUserName,
    hover,
    setHover,
    isOpen,
    setIsOpen,
  };
}
