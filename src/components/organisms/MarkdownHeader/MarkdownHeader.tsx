import {
  CodeSimple,
  Link,
  TextB,
  TextHFour,
  TextHOne,
  TextHThree,
  TextHTwo,
  TextStrikethrough,
  Tray,
} from '@phosphor-icons/react';

import { Box } from '../../atoms/Box';
import { MarkdownDivide } from '../../atoms/Divide';
import * as styles from './markdownHeader.css';

export const MarkdownHeader = () => {
  return (
    <Box className={styles.root({})}>
      <Box className={styles.markdown({})}>
        <Box className={styles.iconBox}>
          <TextHOne size="full" weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <TextHTwo size="full" weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <TextHThree size="full" weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <TextHFour size="full" weight="duotone" />
        </Box>
        <MarkdownDivide />
        <Box className={styles.iconBox}>
          <TextB size="full" weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <TextStrikethrough size="full" weight="duotone" />
        </Box>
        <MarkdownDivide />
        <Box className={styles.iconBox}>
          <Tray size="full" weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <Link size="full" weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <CodeSimple size="full" weight="bold" />
        </Box>
      </Box>
    </Box>
  );
};
