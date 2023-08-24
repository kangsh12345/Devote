import { Box } from '../Box';
import { Button } from '../Button';
import { Stack } from '../Stack';

export interface ModalActionsProps {
  type?: 'left' | 'right' | 'column' | 'row';
}

export const ModalActions = ({ type = 'right' }: ModalActionsProps) => {
  return (
    <Box width="full">
      <Stack
        space="3"
        direction={type === 'column' ? 'vertical' : 'horizontal'}
        justify={type === 'right' ? 'flex-end' : 'flex-start'}
      >
        <Box flex={type === 'left' || type === 'right' ? 'none' : 'auto'}>
          <Button
            size="lg"
            variant="solid"
            radius="md"
            color="gray"
            width={type === 'left' || type === 'right' ? 'fit' : 'full'}
          >
            취소
          </Button>
        </Box>
        <Box flex={type === 'left' || type === 'right' ? 'none' : 'auto'}>
          <Button
            size="lg"
            variant="solid"
            radius="md"
            color="blue"
            width={type === 'left' || type === 'right' ? 'fit' : 'full'}
          >
            삭제
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
