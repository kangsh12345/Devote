'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { WriteHeader } from '@/src/components/organisms/Header/WriteHeader';

import { Box } from '../../atoms/Box';
import { CustomMDEditor } from '../../organisms/CustomMDEditor';

export const PostWritePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isExist, setIsExist] = useState(false);

  const query = useSearchParams();
  const path = query.get('path') ?? '';

  const lastSlashIndex = path.lastIndexOf('/');
  const filePath = path.substring(0, lastSlashIndex + 1);
  const fileTitle = path.substring(lastSlashIndex + 1);

  const userName = session?.user.name;
  const userImage = session?.user.image;
  const userDirname = session?.user.dirName;

  const own = userDirname === filePath.split('/')[0];

  useEffect(() => {
    if (path !== '')
      own
        ? fetch('/api/post/existCheck', {
            method: 'POST',
            body: JSON.stringify({ path: path }),
          })
            .then(res => res.json())
            .then(data => {
              data.exist ? setIsExist(data.exist) : router.push('/');
            })
        : router.push('/');
  }, [path, own, router]);

  return (
    <>
      {isExist && (
        <Box>
          <WriteHeader
            name={userName}
            // image 추후 변경
            image={userImage}
            path={filePath}
            title={fileTitle}
          />
          <CustomMDEditor />
        </Box>
      )}
    </>
  );
};
