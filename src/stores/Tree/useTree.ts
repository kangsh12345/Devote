import { useAtom } from 'jotai';

import { folderPageTreeAtom } from './atoms';

export function useTree() {
  const [folderPageTree, setFolderPageTree] = useAtom(folderPageTreeAtom);

  return { folderPageTree, setFolderPageTree };
}
