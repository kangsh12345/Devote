import { useAtom } from 'jotai';

import {
  dateAtom,
  fullPathAtom,
  isExistAtom,
  mdAtom,
  nameAtom,
} from './statusAtoms';

export function useFilePostAtoms() {
  const [isExist, setIsExist] = useAtom(isExistAtom);
  const [date, setDate] = useAtom(dateAtom);
  const [md, setMd] = useAtom(mdAtom);
  const [name, setName] = useAtom(nameAtom);
  const [fullPath, setFullPath] = useAtom(fullPathAtom);

  return {
    isExist,
    setIsExist,
    date,
    setDate,
    md,
    setMd,
    name,
    setName,
    fullPath,
    setFullPath,
  };
}
