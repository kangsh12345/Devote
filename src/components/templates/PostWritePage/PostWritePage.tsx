'use client';

import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { WriteHeader } from '@/src/components/organisms/Header/WriteHeader';
import { markdownToTxt } from 'markdown-to-txt';
import { toast } from 'react-hot-toast';

import { Box } from '../../atoms/Box';
import { CreateInputModal } from '../../organisms/CreateInputModal';
import { CustomMDEditor } from '../../organisms/CustomMDEditor';

export const PostWritePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const query = useSearchParams();
  const path = query.get('path') ?? '';

  const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]|\s\s+/gi;
  const urlRegex = /!\[.*?\]\((.*?)\)/;

  const specialRegex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  const doublespaceRegex = /\s\s+/g;

  const lastSlashIndex = path.lastIndexOf('/');
  const filePath = path.substring(0, lastSlashIndex + 1);
  const fileTitle = path.substring(lastSlashIndex + 1);

  const userName = session?.user.name;
  const userImage = session?.user.image;
  const userDirname = session?.user.dirName;

  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [inputError, setInputError] = useState('');

  const [isExist, setIsExist] = useState(false);
  const [title, setTitle] = useState(fileTitle);
  const [subtitle, setSubtitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [date, setDate] = useState(new Date());
  const [md, setMd] = useState<string | undefined>();
  const [postId, setPostId] = useState<Number>(-1);

  const own = userDirname === filePath.split('/')[0];

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const match: RegExpExecArray | null = urlRegex.exec(md ?? '');
    const thumbnail = match ? match[1] : '';

    const subTitle =
      subtitle === ''
        ? md
          ? markdownToTxt(md as string).substring(0, 120)
          : ''
        : subtitle;

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
    if (session && title !== fileTitle) {
      fetch(`/api/post/existCheck`, {
        method: 'POST',
        body: JSON.stringify({ path: filePath + title + '.md' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.exist) {
            setTitleError('동일 경로 같은 파일 존재');
            setCreateFolderOpen(false);
            return;
          }
        });
    }

    if (!titleError && title) {
      try {
        fetch('/api/post/write', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: postId,
            path,
            newPath: filePath + title,
            thumbnail,
            title,
            subTitle,
            md,
            date,
          }),
        }).then(res => {
          res.json();
        });

        toast.success('글 생성이 완료되었습니다.');
      } catch (error) {
        toast.error('글 생성 중 오류가 발생했습니다.');
      }
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
    if (fileTitle !== '' && path !== '')
      own
        ? fetch('/api/post/getFile', {
            method: 'POST',
            body: JSON.stringify({ path: path }),
          })
            .then(res => res.json())
            .then(data => {
              data.exist ? setIsExist(data.exist) : router.push('/');
              setPostId(data.data.postId);
              setDate(data.data.date);
              setMd(data.data.content);
              setSubtitle(data.data.subTitle);
            })
        : router.push('/');
  }, [path, fileTitle, own, router]);

  return (
    <>
      {isExist && (
        <Box>
          <WriteHeader
            name={userName}
            // TODO: image 추후 변경
            setCreateFolderOpen={setCreateFolderOpen}
            image={userImage}
            path={filePath}
            title={title}
            handleInput={handleInput}
            error={titleError}
          />
          {createFolderOpen && (
            <CreateInputModal
              title="부제목 작성"
              setOpen={setCreateFolderOpen}
              setInput={setSubtitle}
              handle={handleClick}
              inputLabel="create subtitle"
              placeholder="부제목을 입력해주세요."
              value={subtitle}
              maxLength={120}
              inputError={inputError}
              setInputError={setInputError}
              rightButtonText="저장"
              clearInput={false}
            />
          )}
          <CustomMDEditor md={md} setMd={setMd} />
        </Box>
      )}
    </>
  );
};
