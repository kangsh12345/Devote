'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import { Modal } from '../../moecules/Modal';
import * as styles from './postSubHeader.css';

export interface PostSubHeaderProps {
  path: string;
}

export const PostSubHeader = ({ path }: PostSubHeaderProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const handleRemoveFile = async () => {
    if (session?.user.dirName === path.split('/', 1)[0]) {
      try {
        const res = await fetch(`/api/post/remove`, {
          method: 'POST',
          body: JSON.stringify({
            path: `${path}.md`,
            type: 'file',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res => res.json());

        if (!res.success) {
          toast.error('파일 삭제 중 오류가 말생하였습니다.');
        } else {
          toast.success('파일이 삭제되었습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

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
            handle={handleRemoveFile}
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
