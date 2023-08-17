'use client';

import { useState } from 'react';
import { List } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './popover.css';

export interface PopoverProps {
  size: 'lg' | 'md' | 'sm';
  list: string[];
  disabled?: boolean;
}

export const Popover = ({
  size = 'md',
  list,
  disabled = false,
}: PopoverProps) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(true);

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
        }),
      ]}
      color="textPrimary"
      width="min"
    >
      <Box
        className={[styles.IconBox({ size: size })]}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="md"
        onClick={handleOpen}
      >
        <List
          size={size === 'lg' ? '26' : size === 'md' ? '22' : '20'}
          weight="duotone"
        />
      </Box>
      {list.length > 0 && isOpen ? (
        <Box className={styles.ulContainer}>
          <Box className={styles.ulBox({ size: size })}>
            <Box as="ul">
              {list.map((li, idx) => (
                <Box
                  className={styles.liValue({ active: value === li })}
                  as="li"
                  fontSize="inherit"
                  onClick={() => handleSelect(li)}
                  key={idx}
                >
                  <Box>{li}</Box>
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
