import { Box } from '@/src/components/atoms/Box';
import { WriteHeader } from '@/src/components/organisms/Header/WriteHeader';
import { PostWritePage } from '@/src/components/templates/WritePage';

export default function WritePage() {
  return (
    <Box>
      <WriteHeader />
      <PostWritePage />
    </Box>
  );
}
