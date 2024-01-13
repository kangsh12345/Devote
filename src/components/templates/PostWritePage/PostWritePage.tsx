'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { WriteHeader } from '@/src/components/organisms/Header/WriteHeader';
import markdownToTxt from 'markdown-to-txt';

import { Box } from '../../atoms/Box';
import { CustomMDEditor } from '../../organisms/CustomMDEditor';

export const PostWritePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const query = useSearchParams();
  const path = query.get('path') ?? '';

  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;

  const specialRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  const doublespaceRegex = /\s\s+/g;

  const lastSlashIndex = path.lastIndexOf('/');
  const filePath = path.substring(0, lastSlashIndex + 1);
  const fileTitle = path.substring(lastSlashIndex + 1);

  const userName = session?.user.name;
  const userImage = session?.user.image;
  const userDirname = session?.user.dirName;

  const [isExist, setIsExist] = useState(false);
  const [title, setTitle] = useState(fileTitle);
  const [titleError, setTitleError] = useState('');
  const [md, setMd] = useState<string | undefined>();

  const own = userDirname === filePath.split('/')[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log('hi');

    const subTitle = md
      ? markdownToTxt(md as string).substring(0, 150) + '...'
      : '';

    if (titleError) {
      return;
    }

    if (!title) {
      setTitleError('이름을 입력해주세요');
      return;
    }

    if (regex.test(title) || title.length > 24) {
      setTitleError('올바른 이름을 입력해주세요.');
      return;
    }

    // 여기부터 같은 동선상 exist 체크
    if (session) {
      fetch(`/api/post/existCheck`, {
        method: 'POST',
        body: JSON.stringify({ path: filePath + title }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.exist) {
            setTitleError('동일 경로 같은 파일 존재');
            return;
          }
        });
    }

    try {
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(
      e.target.value.replace(doublespaceRegex, ' ').replace(specialRegex, ''),
    );
    if (titleError !== '') {
      setTitleError('');
    }
  };

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
            // TODO: image 추후 변경
            image={userImage}
            path={filePath}
            title={title}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            error={titleError}
          />
          <CustomMDEditor md={md} setMd={setMd} />
        </Box>
      )}
    </>
  );
};
