import { Box } from '../../atoms/Box';
import { MarkdownHeader } from '../MarkdownHeader';
import { PostSubHeader } from '../PostSubHeader';

export interface SubHeaderProps {
  type?: 'post' | 'write';
}

export const SubHeader = ({ type = 'post' }: SubHeaderProps) => {
  return <Box>{type === 'post' ? <PostSubHeader /> : <MarkdownHeader />}</Box>;
};
