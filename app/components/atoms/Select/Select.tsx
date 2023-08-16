'use client';

import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './select.css';

export interface SelectProps {
  size: 'lg' | 'md' | 'sm';
  list: string[];
  disabled?: boolean;
}

export const Select = ({
  size = 'md',
  list,
  disabled = false,
}: SelectProps) => {
  const [value, setValue] = useState(list[1]);
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
      {list.length > 0 && isOpen ? (
        <Box className={styles.ulContainer}>
          <Box className={styles.ulBox({ size: size })}>
            <Box as="ul">
              {list.map((li, idx) => (
                <Box
                  as="li"
                  fontSize="inherit"
                  onClick={() => handleSelect(li)}
                  key={idx}
                >
                  {li}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};
