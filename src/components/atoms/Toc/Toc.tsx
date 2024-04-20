'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useIntersectionObserver } from '@/src/utils/useIntersectionObserver';
import { List } from '@phosphor-icons/react';

import { Box } from '../Box';
import * as styles from './toc.css';

export interface ListItem {
  value: string;
  heading: 1 | 2 | 3;
}

export interface TocProps {
  size: 'lg' | 'md' | 'sm';
  content: string;
  disabled?: boolean;
}

export const Toc = ({ size = 'md', content, disabled = false }: TocProps) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useIntersectionObserver(setValue, content);

  const titles = content.split(`\n`).filter(t => t.includes('# '));

  const result = titles
    .filter(str => str[0] === '#')
    .map(item => {
      let count = item.match(/#/g)?.length;
      if (count) {
        count = count;
      }

      return { title: item.split('# ')[1].replace(/`/g, '').trim(), count };
    });

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
        {result.length > 0 && isOpen ? (
          <Box className={styles.ulContainer}>
            <Box className={styles.ulBox({ size: size })}>
              {result.map((li, idx) => {
                if (li.count && li.count < 4) {
                  return (
                    <Box
                      className={styles.liValue({
                        active: value === li.title,
                        heading: li.count === 3 ? 3 : li.count === 2 ? 2 : 1,
                      })}
                    >
                      <Link
                        style={{
                          color: 'inherit',
                          textDecoration: 'none',
                          textDecorationLine: 'none',
                        }}
                        href={`#${li.title}`}
                        onClick={() => handleSelect(li.title)}
                        key={idx}
                      >
                        {li.title}
                      </Link>
                    </Box>
                  );
                }
              })}
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
};
