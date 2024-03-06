import { Dispatch, MouseEvent, SetStateAction } from 'react';

import { Box } from '../Box';
import { Button } from '../Button';
import { Stack } from '../Stack';

export interface InputModalActionsProps {
  type?: 'left' | 'right' | 'column' | 'row';
  leftButtonText: string;
  rightButtonText: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setInput: (value: string) => void;
  setInputError: Dispatch<SetStateAction<string>>;
  handle: (event: MouseEvent<HTMLButtonElement>) => void;
  clearInput: boolean;
}

export const InputModalActions = ({
  type = 'right',
  leftButtonText,
  rightButtonText,
  setOpen,
  setInput,
  setInputError,
  handle,
  clearInput,
}: InputModalActionsProps) => {
  return (
    <Box width="full">
      <Stack
        space="2.5"
        direction={type === 'column' ? 'vertical' : 'horizontal'}
        justify={type === 'right' ? 'flex-end' : 'flex-start'}
      >
        <Box
          flex={type === 'left' || type === 'right' ? 'none' : 'auto'}
          onClick={() => {
            setOpen(false);
            clearInput && setInput('');
            setInputError('');
          }}
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
        >
          <Button
            size="lg"
            variant="solid"
            radius="md"
            color="black"
            width={type === 'left' || type === 'right' ? 'fit' : 'full'}
          >
            {rightButtonText}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
