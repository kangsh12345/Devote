import { useAtom } from 'jotai';

import { nameAtom, profileAtom } from './inputAtoms';
import { nameErrorAtom, openAuthAtom, openNameAtom } from './statusAtoms';

export function useSettingsAtoms() {
  const [profile, setProfile] = useAtom(profileAtom);
  const [name, setName] = useAtom(nameAtom);
  const [nameError, setNameError] = useAtom(nameErrorAtom);
  const [openName, setNameOpen] = useAtom(openNameAtom);
  const [openAuth, setAuthOpen] = useAtom(openAuthAtom);

  const resetAtoms = () => {
    setProfile('');
    setName('');
    setNameError('');
    setNameOpen(false);
    setAuthOpen(false);
  };

  return {
    profile,
    setProfile,
    name,
    setName,
    nameError,
    setNameError,
    openName,
    setNameOpen,
    openAuth,
    setAuthOpen,
    resetAtoms,
  };
}
