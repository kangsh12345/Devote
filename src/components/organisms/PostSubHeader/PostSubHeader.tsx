'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Modal } from '../../moecules/Modal';
import * as styles from './postSubHeader.css';

export interface PostSubHeaderProps {
  path: string;
}

export const PostSubHeader = ({ path }: PostSubHeaderProps) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <Box className={styles.root({})}>
      <Box width="fit">
        <Button
          size="sm"
          variant="outline"
          radius="full"
          color="gray"
          onClick={() => router.push(`/write?path=${path}`)}
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
            handle={() => console.log('hi')}
            leftButtonText="취소"
            rightButtonText="삭제"
            withCloseButton={false}
          >
            <Box as="span" textDecoration="underline">
              {path}
            </Box>
            을 삭제하시겠습니까?
          </Modal>
        )}
      </Box>
    </Box>
  );
};
