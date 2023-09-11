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
          <TextHOne size={24} weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <TextHTwo size={24} weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <TextHThree size={24} weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <TextHFour size={24} weight="duotone" />
        </Box>
        <MarkdownDivide />
        <Box className={styles.iconBox}>
          <TextB size={24} weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <TextStrikethrough size={24} weight="duotone" />
        </Box>
        <MarkdownDivide />
        <Box className={styles.iconBox}>
          <Tray size={24} weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <Link size={24} weight="duotone" />
        </Box>
        <Box className={styles.iconBox}>
          <CodeSimple size={24} weight="bold" />
        </Box>
      </Box>
    </Box>
  );
};
