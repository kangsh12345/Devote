'use client';

import Image from 'next/image';

import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Divide } from '../../atoms/Divide';
import { Hover } from '../../atoms/Hover';
import { Input } from '../../atoms/Input';
import { Modal } from '../../moecules/Modal';
import { SubHeader } from '../../organisms/Header';
import { useSettings } from './useSettings';

export const SettingsPage = () => {
  const {
    profile,
    nameError,
    openName,
    setNameOpen,
    openAuth,
    setAuthOpen,
    name,
    fileInputRef,
    handleFileUpload,
    handleTrayClick,
    handleNameModalOpen,
    handleNameChange,
    handleWithdraw,
  } = useSettings();

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
      <Box display="flex" paddingX="28" paddingY="20" flex="auto">
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
                    value={name.value}
                    onChange={name.onChange}
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
                        {name.value}
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
