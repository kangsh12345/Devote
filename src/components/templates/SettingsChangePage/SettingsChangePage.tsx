'use client';

import { useState } from 'react';

import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Divide } from '../../atoms/Divide';
import { Input } from '../../atoms/Input';

export const SettingsChangePage = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  return (
    <Box display="flex" paddingX="28" paddingY="20" flex="auto">
      {/* 
    박스 안에 만들 것들
    1. 프로필 이미지 변경
    2. 이름 변경
    3. 회원 탈퇴
    */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="full"
        backgroundColor="backgroundBase"
        paddingX="10"
        paddingTop="10"
        paddingBottom="25"
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
              // onClick={handleOpen}
            >
              {/* <Image src={image} alt="avatar" fill sizes="100%" /> */}
            </Box>
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
          <Divide />
          <Button size="md" radius="md" color="red">
            회원탈퇴
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
