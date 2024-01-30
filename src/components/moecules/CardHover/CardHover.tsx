// import star from '@phosphor-icons/core/fill/star-fill.svg';
import Image from 'next/image';

// import { format } from 'date-fns';
import { Avatars } from '../../atoms/Avatars';
import { Box } from '../../atoms/Box';
import { Card } from '../../atoms/Card';
import { Hover } from '../../atoms/Hover';
import { Stack } from '../../atoms/Stack';
// import { IconText } from '../../atoms/Text';
// import * as styles from './cardHover.css';

export interface CardHoverProps {
  userName: string;
  date: string;
  thumbnail: string;
}

export const CardHover = ({ userName, date, thumbnail }: CardHoverProps) => {
  return (
    <Box position="relative" width="full" backgroundColor="backgroundBase">
      <Card variant="outline">
        {/* <>여기에 썸네일 이미지 넣기</> */}
        <Image src={thumbnail} alt="thumbnail" fill sizes="100%" />
        <Hover radius="lg">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="full"
          >
            {/* <Box className={styles.iconTextWrapper}>
              <IconText
                type="cardhover"
                size="md"
                leftIcon={<Image src={star} alt="icon" fill sizes="100%" />}
              >
                20
              </IconText>
            </Box> */}
            <Stack align="center" justify="center" space="2.5">
              <Box paddingRight="4" color="textHoverWhite">
                <Avatars size="lg" text={userName} />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="textTertiary"
                paddingLeft="2"
              >
                {/* {format(new Date(date), 'yyyy년 M월 d일')} */}
                {date}
              </Box>
            </Stack>
          </Box>
        </Hover>
      </Card>
    </Box>
  );
};
