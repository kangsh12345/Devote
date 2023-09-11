import Image from 'next/image';
import star from '@phosphor-icons/core/fill/star-fill.svg';

import { Avatars } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
import { Card } from '../../atoms/Card';
import { Hover } from '../../atoms/Hover';
import { Stack } from '../../atoms/Stack';
import { IconText } from '../../atoms/Text';
import * as styles from './cardHover.css';

export const CardHover = () => {
  return (
    <Box position="relative" width="fit" backgroundColor="backgroundBase">
      <Card variant="outline">
        <Hover radius="lg">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="full"
          >
            <Box className={styles.iconTextWrapper}>
              <IconText
                type="cardhover"
                size="md"
                leftIcon={<Image src={star} alt="icon" fill />}
              >
                20
              </IconText>
            </Box>
            <Stack align="center" justify="center" space="2.5">
              <Box paddingRight="4" color="textHoverWhite">
                <Avatars size="lg" text="NickName" />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="textTertiary"
                paddingLeft="2"
              >
                2023년 7월 9일
              </Box>
            </Stack>
          </Box>
        </Hover>
      </Card>
    </Box>
  );
};
