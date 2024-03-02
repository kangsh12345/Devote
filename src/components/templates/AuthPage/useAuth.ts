'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import useInput from '@/src/utils/useInput';
import isEmail from 'validator/lib/isEmail';

import { useAuthAtoms } from './atoms/useAuthAtoms';

export interface EmailCheckMutationResponse {
  success: boolean;
  message: string;
}

export function useAuth() {
  const {
    resetAtom,
    email: storeEamil,
    setEmail,
    name: storeName,
    setName,
    password: storePassword,
    setPassword,
    passwordCheck: storePasswordCheck,
    setPasswordCheck,
  } = useAuthAtoms();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,24}$/;

  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [title, setTitle] = useState('로그인');

  const email = useInput({ initialValue: storeEamil });
  const name = useInput({ initialValue: storeName });
  const password = useInput({ initialValue: storePassword });
  const passwordCheck = useInput({ initialValue: storePasswordCheck });

  const handleEmailSignup = async () => {
    if (!passwordRegex.test(password.value)) {
      setPasswordError('특수기호 + 영문 + 숫자 조합 8자리 이상 입력해주세요.');
      setPasswordCheckError('올바른 비밀번호를 입력해주세요.');
      return;
    } else if (password.value != passwordCheck.value) {
      setPasswordCheckError('동일한 비밀번호를 입력해주세요.');
      return;
    } else if (
      name.value === '' ||
      email.value === '' ||
      password.value === '' ||
      passwordCheck.value === ''
    ) {
      if (name.value === '') {
        setNameError('이름을 입력해주세요.');
      }
      if (email.value === '') {
        setEmailError('이메일을 입력해주세요.');
      }
      if (password.value === '') {
        setPasswordError('비밀번호를 입력해주세요.');
      }
      if (passwordCheck.value === '') {
        setPasswordCheckError('비밀번호를 입력해주세요.');
      }

      return;
    } else if (emailError || passwordError || passwordCheckError) {
      return;
    }

    const res = await fetch(`/api/auth/sign-up/email/check/email`, {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
      }),
    }).then(res => res.json());

    if (!res.success) {
      setEmailError(res.message);
      return;
    } else {
      await signIn('signup', {
        name: name.value,
        email: email.value,
        password: password.value,
        image: 'https://source.boringavatars.com/beam',
        redirect: true,
        callbackUrl: '/',
      });
    }
  };

  const handleEmailSignin = async () => {
    if (!passwordRegex.test(password.value)) {
      setPasswordError('특수기호 + 영문 + 숫자 조합 8자리 이상 입력해주세요.');
      return;
    } else if (emailError || passwordError) {
      return;
    }

    await signIn('credentials', {
      email: email.value,
      password: password.value,
      redirect: false,
    }).then(res => {
      if (!res?.error) {
        resetAtom();
        router.push(callbackUrl ?? '/');
      } else {
        setPassword('');
        setPasswordError('이메일 또는 비밀번호가 유효하지 않습니다.');
      }
    });
  };

  useEffect(() => {
    if (nameError !== '') {
      setNameError('');
    }
  }, [name.value, nameError]);

  useEffect(() => {
    if (email.value && !isEmail(email.value)) {
      setEmailError('이메일 형식으로 작성해주세요.');
    } else {
      setEmailError('');
    }
  }, [email.value]);

  useEffect(() => {
    if (passwordError === '이메일 또는 비밀번호가 유효하지 않습니다.') {
      setPasswordError('');
    } else if (passwordError !== '' && passwordRegex.test(password.value)) {
      setPasswordError('');
    }
  }, [password.value, passwordError]);

  useEffect(() => {
    if (passwordCheckError !== '' && password.value === passwordCheck.value) {
      setPasswordCheckError('');
    }
  }, [passwordCheck.value, password.value, passwordCheckError]);

  return {
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
    passwordRegex,
    nameError,
    setNameError,
    passwordCheckError,
    setPasswordCheckError,
    passwordError,
    setPasswordError,
    title,
    setTitle,
    handleEmailSignup,
    handleEmailSignin,
  };
}
