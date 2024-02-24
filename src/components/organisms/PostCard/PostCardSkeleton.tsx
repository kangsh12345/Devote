import { Box } from '../../atoms/Box';
import { Card } from '../../atoms/Card';
import * as styles from './postCard.css';

export const PostCardSkeleton = () => {
  return (
    <Box className={styles.rootRow({})}>
      <Box className={styles.wrapperRow({})}>
        <Box className={styles.cardWrapperRow({})}>
          <Card skeleton />
        </Box>
        <Box className={styles.contentWrapperRow({})}>
          <Box
            display="flex"
            justifyContent="flex-start"
            height="6"
            width="36"
            borderRadius="md"
            className={styles.skeleton}
          />
          <Box height="16" borderRadius="md" className={styles.skeleton} />
        </Box>
      </Box>
    </Box>
  );
};
