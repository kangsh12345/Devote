'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import fileUpload from '@/src/utils/fileUpload';

import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Divide } from '../../atoms/Divide';
import { Hover } from '../../atoms/Hover';
import { Input } from '../../atoms/Input';

export const SettingsChangePage = () => {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [profile, setProfile] = useState(session?.user.image);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(session?.user.name);
  const [nameError, setNameError] = useState('');

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      const url = await fileUpload(file);

      if (url && status === 'authenticated') {
        // update가 안바뀌는 문제
        update({ user: { image: url } });
        setProfile(url);
        const res = await fetch(`/api/post/updateProfile`, {
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

  return (
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
                  placeholder="이름을 입력해주세요."
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
                <Button size="lg" radius="md" color="brand" width="fit">
                  변경
                </Button>
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
            <Button size="md" radius="md" color="red">
              회원탈퇴
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
