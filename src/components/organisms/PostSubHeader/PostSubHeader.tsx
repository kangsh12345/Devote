'use client';

import { Box } from '../../atoms/Box';
import { BreadcrumbFileDynamicEllipsis } from '../../atoms/BreadcrumbDynamicEllipsis';
import { Button } from '../../atoms/Button';
import { Stack } from '../../atoms/Stack';
import { Modal } from '../../moecules/Modal';
import * as styles from './postSubHeader.css';
import { usePostSubHeader } from './usePostSubHeader';

export interface PostSubHeaderProps {
  fullPath: string;
  path: string;
  own: boolean;
}

export const PostSubHeader = ({ fullPath, path, own }: PostSubHeaderProps) => {
  const { open, setOpen, router, handleRemoveFile, removeFileLoading } =
    usePostSubHeader({
      path: fullPath,
    });

  return (
    <Box className={styles.root({})}>
      <BreadcrumbFileDynamicEllipsis fullPath={path} />
      {own && (
        <Stack direction="horizontal" space="1.5" align="center">
          <Box width="fit" flexShrink={0}>
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
          <Box width="fit" flexShrink={0}>
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
                loading={removeFileLoading}
              >
                <Box as="span" textDecoration="underline">
                  {fullPath}
                </Box>
                을 삭제하시겠습니까?
              </Modal>
            )}
          </Box>
        </Stack>
      )}
    </Box>
  );
};
