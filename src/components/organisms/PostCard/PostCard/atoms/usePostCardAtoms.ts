import { useAtom } from 'jotai';

import { folderNameAtom } from './inputAtoms';
import { deleteOpenAtom, inputErrorAtom, modfiyOpenAtom } from './statusAtoms';

export function usePostCardAtoms() {
  const [modfiyOpen, setModifyOpen] = useAtom(modfiyOpenAtom);
  const [deleteOpen, setDeleteOpen] = useAtom(deleteOpenAtom);
  const [folderName, setFolderName] = useAtom(folderNameAtom);
  const [inputError, setInputError] = useAtom(inputErrorAtom);

  const resetAtom = () => {
    setModifyOpen(false);
    setDeleteOpen(false);
    setFolderName('');
    setInputError('');
  };

  return {
    modfiyOpen,
    setModifyOpen,
    deleteOpen,
    setDeleteOpen,
    folderName,
    setFolderName,
    inputError,
    setInputError,
    resetAtom,
  };
}
