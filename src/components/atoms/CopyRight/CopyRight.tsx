'use client';

import { Copyright } from '@phosphor-icons/react';

import { Box } from '../Box';
import { Stack } from '../Stack';

export const CopyRight = () => {
  return (
    <Box width="57" color="textDisabled">
      <Stack space="1" direction="horizontal" justify="center" align="center">
        <Copyright size={14} weight="bold" />
        <Box fontSize="1" fontWeight={500}>
          Devote All Right Reserved
        </Box>
      </Stack>
    </Box>
  );
};
