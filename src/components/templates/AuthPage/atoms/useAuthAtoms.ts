import { useAtom } from 'jotai';

import {
  emailAtom,
  nameAtom,
  passwordAtom,
  passwordCheckAtom,
} from './inputAtoms';
import {
  emailErrorAtom,
  nameErrorAtom,
  passwordCheckErrorAtom,
  passwordErrorAtom,
  titleAtom,
} from './statusAtoms';

export function useAuthAtoms() {
  //input
  const [email, setEmail] = useAtom(emailAtom);
  const [name, setName] = useAtom(nameAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [passwordCheck, setPasswordCheck] = useAtom(passwordCheckAtom);

  //ᅛstatus
  const [emailError, setEmailError] = useAtom(emailErrorAtom);
  const [nameError, setNameError] = useAtom(nameErrorAtom);
  const [passwordCheckError, setPasswordCheckError] = useAtom(
    passwordCheckErrorAtom,
  );
  const [passwordError, setPasswordError] = useAtom(passwordErrorAtom);
  const [title, setTitle] = useAtom(titleAtom);

  const resetAtom = () => {
    setEmail('');
    setName('');
    setPassword('');
    setPasswordCheck('');
    setEmailError('');
    setNameError('');
    setPasswordCheckError('');
    setPasswordError('');
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
    emailError,
    setEmailError,
    nameError,
    setNameError,
    passwordCheckError,
    setPasswordCheckError,
    passwordError,
    setPasswordError,
    title,
    setTitle,
  };
}
