'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useUpdateNameMutation } from '@/src/hooks/api/auth/useUpdateNameMutation';
import { useUpdateProfileMutation } from '@/src/hooks/api/auth/useUpdateProfileMutation';
import { useWithdrawQuery } from '@/src/hooks/api/auth/useWithdrawQuery';
import fileUpload from '@/src/utils/fileUpload';
import useInput from '@/src/utils/useInput';
import { toast } from 'react-hot-toast';

import { useSettingsAtoms } from './atoms/useSettingsAtoms';

export function useSettings() {
  const {
    profile,
    setProfile,
    name: storeName,
    setName,
    nameError,
    setNameError,
    openName,
    setNameOpen,
    openAuth,
    setAuthOpen,
  } = useSettingsAtoms();

  const router = useRouter();
  const { data: session, status, update } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const name = useInput({ initialValue: storeName });

  const {
    mutate: updateName,
    data: updateNameData,
    error: updateNameError,
    isLoading: updateNameLoading,
  } = useUpdateNameMutation();
  const {
    mutate: updateProfile,
    data: updateProfileData,
    error: updateProfileError,
    isLoading: updateProfileLoading,
  } = useUpdateProfileMutation();

  const {
    data: withdrawData,
    error: withdrawError,
    isLoading: withdrawLoading,
    refetch: withdrawRefetch,
  } = useWithdrawQuery();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const url = await fileUpload(file);

      if (url && status === 'authenticated') {
        updateProfile({ url: url });
        update({ user: { image: url } });
        setProfile(url);
        router.refresh();
      }
    }
  };

  const handleTrayClick = () => {
    fileInputRef.current?.click();
  };

  const handleNameModalOpen = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (name.value === session?.user.name) return;
    if (name.value === '') {
      setNameError('닉네임을 입력해주세요.');
      return;
    }

    if (nameError) return;

    setNameOpen(true);
  };

  const handleNameChange = async () => {
    if (name.value === session?.user.name) return;
    if (name.value === '') {
      setNameError('닉네임을 입력해주세요.');
      return;
    }

    if (nameError) return;

    updateName({ name: name.value });
    // TODO: mutate 미리 prefetch 적용 예정
    router.refresh();
  };

  const handleWithdraw = async () => {
    withdrawRefetch;
  };

  useEffect(() => {
    if (updateProfileError)
      toast.error(
        (updateProfileError as Error).message ??
          '업데이트 도중 에러가 발생했습니다',
      );
  }, [updateProfileError]);

  useEffect(() => {
    console.log(updateNameData);

    if (updateNameData && updateNameData.success) {
      update({ user: { name: name.value } });
      toast.success('이름이 변경되었습니다');
    }
  }, [updateNameData]);

  useEffect(() => {
    if (updateNameError)
      toast.error(
        (updateNameError as Error).message ??
          '업데이트 도중 에러가 발생했습니다',
      );
  }, [updateNameError]);

  useEffect(() => {
    if (updateProfileData && updateProfileData.success) {
      toast.success('프로필이 변경되었습니다');
    }
  }, [updateProfileData]);

  useEffect(() => {
    if (withdrawData && withdrawData.success) {
      signOut({ callbackUrl: '/' });
    }
  }, [withdrawData]);

  useEffect(() => {
    if (withdrawError) {
      toast.error(
        (updateNameError as Error).message ??
          '회원 탈퇴 도중 에러가 발생했습니다',
      );
    }
  }, [withdrawError]);

  useEffect(() => {
    if (nameError !== '') {
      setNameError('');
    }
  }, [name.value, nameError]);

  useEffect(() => {
    if (session) {
      setProfile(session.user.image);
      name.setValue(session.user.name);
    }
  }, [session]);

  return {
    profile,
    setProfile,
    setName,
    nameError,
    setNameError,
    openName,
    setNameOpen,
    openAuth,
    setAuthOpen,
    name,
    router,
    session,
    fileInputRef,
    updateNameLoading,
    updateProfileLoading,
    withdrawLoading,
    handleFileUpload,
    handleTrayClick,
    handleNameModalOpen,
    handleNameChange,
    handleWithdraw,
  };
}
