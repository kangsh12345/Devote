import { Dispatch, SetStateAction } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { Stack } from '../Stack';

export interface ModalActionsProps {
  type?: 'left' | 'right' | 'column' | 'row';
  leftButtonText: string;
  rightButtonText: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handle: () => void;
  loading?: boolean;
}

export const ModalActions = ({
  type = 'right',
  leftButtonText,
  rightButtonText,
  setOpen,
  handle,
  loading,
}: ModalActionsProps) => {
  return (
    <Box width="full">
      <Stack
        space="2.5"
        direction={type === 'column' ? 'vertical' : 'horizontal'}
        justify={type === 'right' ? 'flex-end' : 'flex-start'}
      >
        <Box
          flex={type === 'left' || type === 'right' ? 'none' : 'auto'}
          onClick={() => setOpen(false)}
        >
          <Button
            size="lg"
            variant="solid"
            radius="md"
            color="gray"
            width={type === 'left' || type === 'right' ? 'fit' : 'full'}
          >
            {leftButtonText}
          </Button>
        </Box>
        <Box
          flex={type === 'left' || type === 'right' ? 'none' : 'auto'}
          onClick={handle}
          disabled={loading}
        >
          <Button
            size="lg"
            variant="solid"
            radius="md"
            color="black"
            disabled={loading}
            width={type === 'left' || type === 'right' ? 'fit' : 'full'}
          >
            {rightButtonText}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
