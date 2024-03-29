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
    userImage,
    title,
    subtitle,
    md,
    handleClick,
    handleInput,
  } = usePostWrite();

  return (
    <>
      {isExist && (
        <Box>
          <WriteHeader
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
