import { Box } from '../../atoms/Box';
import { Toc } from '../../atoms/Toc';
import { PostHeader } from '../../organisms/Header';
import { PostSubHeader } from '../../organisms/PostSubHeader';
import { PreivewMDEditor } from '../../organisms/PreviewMDEditor';
import * as styles from './filePostPage.css';
import { useFilePost } from './useFilePost';

export interface FilePostPageProps {
  title: string;
  own: boolean;
  path: string;
}

export const FilePostPage = ({ title, own, path }: FilePostPageProps) => {
  const { isExist, date, md, setMd, name, fullPath, getFileLoading } =
    useFilePost({
      title,
      path,
    });

  if (getFileLoading) {
    // TODO: 로딩 나중에 스@근하게 다시 제작
    return <>파일 불러오는 중</>;
  }

  return (
    <>
      {isExist && (
        <Box
          position="relative"
          height="full"
          minHeight="viewHeight"
          backgroundColor="backgroundBase"
        >
          <PostHeader name={name} path={path} title={title} date={date} />
          {own && <PostSubHeader path={fullPath} />}
          <Box display="flex" height="full" justifyContent="center">
            <Box width="full" height="full">
              <Box className={styles.markdownBox({ own })}>
                <PreivewMDEditor md={md} setMd={setMd} own={own} />
              </Box>
            </Box>
            <Toc size="md" content={md ?? ''} />
          </Box>
        </Box>
      )}
    </>
  );
};
