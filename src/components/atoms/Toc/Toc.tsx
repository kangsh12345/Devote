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
  // list: ListItem[];
  content: string;
  disabled?: boolean;
}

export const Toc = ({ size = 'md', content, disabled = false }: TocProps) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useIntersectionObserver(setValue, content);

  // 게시물 본문을 줄바꿈 기준으로 나누고, 제목 요소인 것만 저장
  const titles = content.split(`\n`).filter(t => t.includes('# '));

  // 예외처리 - 제목은 문자열 시작부터 #을 써야함
  const result = titles
    .filter(str => str[0] === '#')
    .map(item => {
      // #의 갯수에 따라 제목의 크기가 달라지므로 갯수를 센다.
      let count = item.match(/#/g)?.length;
      if (count) {
        // 갯수에 따라 목차에 그릴때 들여쓰기 하기위해 *10을 함.
        count = count;
      }

      // 제목의 내용물만 꺼내기 위해 '# '을 기준으로 나누고, 백틱과 공백을 없애주고 count와 묶어서 리턴
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
              {/* TODO: css가 날라가벌임;; */}
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
                        {/* <Box as="a"></Box> */}
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
