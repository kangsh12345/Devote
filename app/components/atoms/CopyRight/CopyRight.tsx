'use client';

import { Copyright } from '@phosphor-icons/react';

import { Box } from '../Box';
import Text from '../Typography/Text';

export interface CopyRightProps {
  size: 'lg' | 'md';
}

export interface CopyRightSizeProps {
  textSize: 'body2' | 'caption';
  copyrightSize: 18 | 16;
}

export const CopyRight = ({ size }: CopyRightProps) => {
  const copyRightSize: CopyRightSizeProps =
    size === 'lg'
      ? { textSize: 'body2', copyrightSize: 18 }
      : { textSize: 'caption', copyrightSize: 16 };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      width="56"
      color="textDisabled"
      gap="1"
    >
      <Copyright size={copyRightSize.copyrightSize} weight="bold" />
      <Text size={copyRightSize.textSize} weight="medium">
        Devote All Right Reserved
      </Text>
    </Box>
  );
};
