'use client';

import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Stack } from '../../atoms/Stack';
import { Modal } from '../../moecules/Modal';
import * as styles from './postSubHeader.css';
import { usePostSubHeader } from './usePostSubHeader';

export interface PostSubHeaderProps {
  fullPath: string;
  path: string;
}

export const PostSubHeader = ({ fullPath, path }: PostSubHeaderProps) => {
  const { open, setOpen, router, handleRemoveFile } = usePostSubHeader({
    path: fullPath,
  });

  return (
    <Box className={styles.root({})}>
      <Box
        fontSize="1"
        fontWeight={400}
        color="textTertiary"
        display="flex"
        flexDirection="row"
        gap="1"
        marginLeft="1"
      >
        {path?.split('/').map((item, idx) => (
          <Box
            onClick={() =>
              router.push(
                `/posts/${path
                  .split('/')
                  .slice(0, idx + 1)
                  .join('/')}`,
              )
            }
            key={idx}
          >
            {idx !== 0 ? '/' : ''} {item}
          </Box>
        ))}
      </Box>
      <Stack direction="horizontal" space="1.5" align="center">
        <Box width="fit">
          <Button
            size="sm"
            variant="outline"
            radius="full"
            color="gray"
            onClick={() => router.push(`/write?path=${fullPath}`)}
          >
            수정
          </Button>
        </Box>
        <Box width="fit">
          <Button
            size="sm"
            variant="outline"
            radius="full"
            color="gray"
            onClick={() => setOpen(true)}
          >
            삭제
          </Button>
          {open && (
            <Modal
              type="right"
              title="파일 삭제"
              setOpen={setOpen}
              handle={handleRemoveFile}
              leftButtonText="취소"
              rightButtonText="삭제"
              withCloseButton={false}
            >
              <Box as="span" textDecoration="underline">
                {fullPath}
              </Box>
              을 삭제하시겠습니까?
            </Modal>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
