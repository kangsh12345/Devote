import { WriteHeader } from '@/src/components/organisms/Header/WriteHeader';

import { Box } from '../../atoms/Box';
import { CustomMDEditor } from '../../organisms/CustomMDEditor';

export const PostWritePage = () => {
  return (
    <Box>
      <WriteHeader />
      <CustomMDEditor />
    </Box>
  );
};
