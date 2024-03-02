import { useAtom } from 'jotai';

import {
  emailAtom,
  nameAtom,
  passwordAtom,
  passwordCheckAtom,
} from './inputAtoms';

export function useAuthAtoms() {
  //input
  const [email, setEmail] = useAtom(emailAtom);
  const [name, setName] = useAtom(nameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [passwordCheck, setPasswordCheck] = useAtom(passwordCheckAtom);

  const resetAtom = () => {
    setEmail('');
    setName('');
    setPassword('');
    setPasswordCheck('');
  };

  return {
    resetAtom,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
  };
}
