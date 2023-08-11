'use client';

import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './select.css';

export interface SelectProps {
  size: 'lg' | 'md' | 'sm';
  disabled?: boolean;
}

export const Select = ({ size = 'md', disabled = false }: SelectProps) => {
  // Doing: lg select
  const [value, setValue] = useState('이번주');

  return (
    <Box>
      <Box
        className={[
          styles.root({
            disabled,
            size: size,
          }),
        ]}
        color="textPrimary"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderColor="borderPrimary"
        borderWidth="px"
        borderRadius="md"
      >
        {value}
        <CaretDown size="16" weight="bold" />
      </Box>
    </Box>
  );
};
