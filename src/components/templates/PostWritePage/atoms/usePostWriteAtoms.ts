import { useAtom } from 'jotai';

import { mdAtom, subtitleAtom, titleAtom } from './inputAtoms';
import {
  createFolderOpenAtom,
  dateAtom,
  inputErrorAtom,
  isExistAtom,
  psotIdAtom,
  titleErrorAtom,
} from './statusAtoms';

export function usePostWriteAtoms() {
  const [createFolderOpen, setCreateFolderOpen] = useAtom(createFolderOpenAtom);
  const [inputError, setInputError] = useAtom(inputErrorAtom);
  const [isExist, setIsExist] = useAtom(isExistAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [titleError, setTitleError] = useAtom(titleErrorAtom);
  const [date, setDate] = useAtom(dateAtom);
  const [md, setMd] = useAtom(mdAtom);
  const [postId, setPostId] = useAtom(psotIdAtom);

  const resetAtom = () => {
    setCreateFolderOpen(false);
    setInputError('');
    setIsExist(false);
    setTitle('');
    setSubtitle('');
    setTitleError('');
    setDate(new Date());
    setMd('');
    setPostId(0);
  };

  return {
    resetAtom,
    createFolderOpen,
    setCreateFolderOpen,
    inputError,
    setInputError,
    isExist,
    setIsExist,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    titleError,
    setTitleError,
    date,
    setDate,
    md,
    setMd,
    postId,
    setPostId,
  };
}
