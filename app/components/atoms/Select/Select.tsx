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
  const [value, setValue] = useState('이번주');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      className={[
        styles.button({
          disabled,
          size: size,
        }),
      ]}
      color="textPrimary"
      borderColor="borderPrimary"
      borderWidth="px"
      borderRadius="md"
      display="flex"
      alignItems="center"
      onClick={handleOpen}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="full"
      >
        {value}
        <CaretDown size="16" weight="bold" />
      </Box>
      {isOpen ? (
        <Box className={styles.ulContainer}>
          <Box className={styles.ulBox({ size: size })}>
            <Box as="ul">
              <Box
                as="li"
                fontSize="inherit"
                onClick={() => handleSelect('오늘')}
              >
                오늘
              </Box>
              <Box
                as="li"
                fontSize="inherit"
                onClick={() => handleSelect('이번주')}
              >
                이번주
              </Box>
              <Box
                as="li"
                fontSize="inherit"
                onClick={() => handleSelect('이번달')}
              >
                이번달
              </Box>
              <Box
                as="li"
                fontSize="inherit"
                onClick={() => handleSelect('전체')}
              >
                전체
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};
