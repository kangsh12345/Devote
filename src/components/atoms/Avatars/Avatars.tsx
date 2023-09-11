import Avatar from 'boring-avatars';

import { Box } from '../Box';
import { Stack } from '../Stack';
import * as styles from './avatar.css';

export interface AvatarsProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
  text?: string;
  colors?: string[];
}

export interface Space {
  space: '2.5' | '3' | '4' | '5';
  avatar: number;
}

export const Avatars = ({
  size = 'md',
  name = 'Maria Mitchell',
  text,
  colors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'],
}: AvatarsProps) => {
  const sizes: Space =
    size === 'sm'
      ? { space: '2.5', avatar: 24 }
      : size === 'md'
      ? { space: '3', avatar: 32 }
      : size === 'lg'
      ? { space: '4', avatar: 48 }
      : { space: '5', avatar: 64 };

  return (
    <Box width="fit">
      <Stack direction="horizontal" align="center" space={sizes.space}>
        <Avatar
          size={sizes.avatar}
          variant="beam"
          name={name}
          colors={colors}
        />
        <Box className={styles.text({ size: size })}>{text}</Box>
      </Stack>
    </Box>
  );
};
