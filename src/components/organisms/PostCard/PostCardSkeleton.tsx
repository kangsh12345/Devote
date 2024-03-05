import { Box } from '../../atoms/Box';
import { Card } from '../../atoms/Card';
import * as styles from './postCard.css';

export interface PostCardSkeletonProps {
  direction: 'row' | 'column';
}

export const PostCardSkeleton = ({ direction }: PostCardSkeletonProps) => {
  return (
    <>
      {direction === 'row' ? (
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
      ) : (
        <Box className={styles.rootColumn({})}>
          <Box
            display="flex"
            flexShrink={0}
            justifyContent="center"
            alignItems="center"
            height="24"
          >
            <Box width="23">
              <Card skeleton />
            </Box>
          </Box>
          <Box className={styles.contentWrapperColmn} gap="4">
            <Box className={styles.mainContentColumn} width="full">
              <Box
                display="flex"
                alignItems="center"
                fontWeight={700}
                fontSize="3"
                height="12"
              >
                <Box
                  width="36"
                  height="6"
                  borderRadius="md"
                  className={styles.skeleton}
                />
              </Box>
              <Box className={styles.subtitleColumn({})} width="full">
                <Box
                  width="full"
                  height="6"
                  borderRadius="md"
                  className={styles.skeleton}
                />
              </Box>
            </Box>
            <Box className={styles.subContentColumn({ hover: false })}>
              <Box className={styles.dateColumn}>
                <Box
                  width="36"
                  height="5"
                  borderRadius="md"
                  className={styles.skeleton}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
