import { Box } from '@/src/components/atoms/Box';
import { Header } from '@/src/components/organisms/Header';
import { PostWritePage } from '@/src/components/templates/WritePage';

export default function WritePage() {
  return (
    <Box>
      <Header type="write" />
      <PostWritePage />
    </Box>
  );
}
