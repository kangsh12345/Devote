'use client';

import { WriteHeader } from '@/src/components/organisms/Header/WriteHeader';

import { Box } from '../../atoms/Box';
import { CreateInputModal } from '../../organisms/CreateInputModal';
import { CustomMDEditor } from '../../organisms/CustomMDEditor';
import { usePostWrite } from './usePostWrite';

export const PostWritePage = () => {
  const {
    createFolderOpen,
    setCreateFolderOpen,
    inputError,
    setInputError,
    isExist,
    titleError,
    filePath,
    userName,
    userImage,
    title,
    subtitle,
    md,
    handleClick,
    handleInput,
    // postWriteLoading,
    getFileLoading,
  } = usePostWrite();

  if (getFileLoading) {
    // TODO: 로딩 나중에 쌈@뽕하게 다시 제작
    return <>파일 불러오는 중</>;
  }

  return (
    <>
      {isExist && (
        <Box>
          <WriteHeader
            name={userName}
            setCreateFolderOpen={setCreateFolderOpen}
            image={userImage}
            path={filePath}
            title={title.value}
            handleInput={handleInput}
            error={titleError}
          />
          {createFolderOpen && (
            <CreateInputModal
              title="부제목 작성"
              setOpen={setCreateFolderOpen}
              setInput={subtitle.setValue}
              handle={handleClick}
              inputLabel="create subtitle"
              placeholder="부제목을 입력해주세요."
              value={subtitle.value}
              maxLength={120}
              inputError={inputError}
              setInputError={setInputError}
              rightButtonText="저장"
              clearInput={false}
            />
          )}
          <CustomMDEditor md={md.value} setMd={md.setValue} />
        </Box>
      )}
    </>
  );
};
