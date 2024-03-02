'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import fileUpload from '@/src/utils/fileUpload';

import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Divide } from '../../atoms/Divide';
import { Hover } from '../../atoms/Hover';
import { Input } from '../../atoms/Input';
import { Modal } from '../../moecules/Modal';
import { SubHeader } from '../../organisms/Header';

export const SettingsPage = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [profile, setProfile] = useState(session?.user.image);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(session?.user.name);
  const [nameError, setNameError] = useState('');

  const [openName, setNameOpen] = useState(false);
  const [openAuth, setAuthOpen] = useState(false);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const url = await fileUpload(file);

      if (url && status === 'authenticated') {
        update({ user: { image: url } });
        setProfile(url);
        const res = await fetch(`/api/auth/updateProfile`, {
          method: 'POST',
          body: JSON.stringify({
            url: url,
          }),
        }).then(res => res.json());

        console.log(res);

        router.refresh();
      }
    }
  };

  const handleTrayClick = () => {
    fileInputRef.current?.click();
  };

  const handleNameModalOpen = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (name === session?.user.name) return;
    if (name === '') {
      setNameError('닉네임을 입력해주세요.');
      return;
    }

    if (nameError) return;

    setNameOpen(true);
  };

  const handleNameChange = async () => {
    if (name === session?.user.name) return;
    if (name === '') {
      setNameError('닉네임을 입력해주세요.');
      return;
    }

    if (nameError) return;

    const res = await fetch(`/api/auth/updateName`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
      }),
    }).then(res => res.json());

    console.log(res);

    if (res.success) {
      update({ user: { name: name } });
    }

    router.refresh();
  };

  const handleWithdraw = async () => {
    const res = await fetch(`/api/auth/withdraw`).then(res => res.json());

    console.log(res);

    if (res.ok) {
      signOut({ callbackUrl: '/' });
    }
  };

  useEffect(() => {
    if (session) {
      setProfile(session.user.image);
      setName(session.user.name);
    }
  }, [session]);

  return (
    <Box
      position="relative"
      height="full"
      display="flex"
      flexDirection="column"
      minHeight="viewHeight"
      backgroundColor="backgroundElevatedPrimary"
    >
      <SubHeader text="설정" />
      <Box
        display="flex"
        paddingX="28"
        paddingY="20"
        flex="auto"
        onClick={() => console.log(session)}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="full"
          backgroundColor="backgroundBase"
          paddingX="10"
          paddingTop="10"
          paddingBottom="30"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="9"
            width="96"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="full"
              gap="6"
            >
              <Box
                width="40"
                height="40"
                overflow="hidden"
                borderRadius="full"
                position="relative"
                backgroundColor="gray100"
                onClick={handleTrayClick}
              >
                <Image src={profile} alt="avatar" fill sizes="100%" />
                <Hover radius="full">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="full"
                    color="textWhite"
                    fontSize="1"
                  >
                    프로필 변경하기
                  </Box>
                </Hover>
              </Box>
              <Box
                as="input"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                display="none"
                onChange={handleFileUpload}
              />
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                gap="2"
                width="full"
              >
                <Box color="textSecondary" fontSize="1">
                  닉네임
                </Box>
                <Box display="flex" gap="2" width="full" alignItems="center">
                  <Input
                    error={nameError}
                    label="name"
                    hideLabel
                    placeholder="닉네임을 입력해주세요."
                    maxLength={24}
                    variant="outline"
                    size="md"
                    value={name}
                    onChange={event => {
                      setName(event.target.value);
                      if (nameError !== '') {
                        setNameError('');
                      }
                    }}
                  />
                  <Button
                    size="lg"
                    radius="md"
                    color="brand"
                    width="fit"
                    onClick={handleNameModalOpen}
                  >
                    변경
                  </Button>
                  {openName && (
                    <Modal
                      type="right"
                      title="닉네임 변경"
                      setOpen={setNameOpen}
                      handle={handleNameChange}
                      leftButtonText="취소"
                      rightButtonText="확인"
                      withCloseButton={false}
                    >
                      "
                      <Box as="span" fontWeight={700}>
                        {name}
                      </Box>
                      " 으로 닉네임을 변경하시겠습니까?
                    </Modal>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              display="flex"
              width="full"
              flexDirection="column"
              alignItems="center"
              gap="4"
            >
              <Divide />
              <Button
                size="md"
                radius="md"
                color="red"
                onClick={() => setAuthOpen(true)}
              >
                회원탈퇴
              </Button>
              {openAuth && (
                <Modal
                  type="right"
                  title="회원 탈퇴"
                  setOpen={setAuthOpen}
                  handle={handleWithdraw}
                  leftButtonText="취소"
                  rightButtonText="확인"
                  withCloseButton={false}
                >
                  <Box as="span" fontWeight={500} color="redPrimary">
                    탈퇴 시 회원에 대한 정보들은 다시 복구 할 수 없습니다.
                  </Box>
                </Modal>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};