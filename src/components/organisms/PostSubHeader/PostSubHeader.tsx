import { Box } from '../../atoms/Box';
import { Button } from '../../atoms/Button';
import * as styles from './postSubHeader.css';

export const PostSubHeader = () => {
  return (
    <Box className={styles.root({})}>
      <Box width="fit">
        <Button size="sm" variant="outline" radius="full" color="gray">
          수정
        </Button>
      </Box>
      <Box width="fit">
        <Button size="sm" variant="outline" radius="full" color="gray">
          삭제
        </Button>
      </Box>
    </Box>
  );
};
