'use client';

import { useState } from 'react';
import { List } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './popover.css';

export interface ListItem {
  value: string;
  heading: 1 | 2 | 3;
}

export interface PopoverProps {
  size: 'lg' | 'md' | 'sm';
  list: ListItem[];
  disabled?: boolean;
}

export const Popover = ({
  size = 'md',
  list,
  disabled = false,
}: PopoverProps) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className={styles.root}>
      <Box
        className={[
          styles.button({
            disabled,
          }),
        ]}
        color="textPrimary"
        width="fit"
        marginTop="6"
      >
        <Box
          className={[styles.IconBox({ size: size, open: isOpen })]}
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
                    className={styles.liValue({
                      active: value === li.value,
                      heading: li.heading ?? 1,
                    })}
                    as="li"
                    fontSize="inherit"
                    onClick={() => handleSelect(li.value)}
                    key={idx}
                  >
                    <Box>{li.value}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};
