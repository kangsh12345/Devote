import {
  AllHTMLAttributes,
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
} from 'react';
import { useFieldIds } from '@/app/hooks';
import { ReactNodeNoStrings } from '@/app/types';

import { Box, BoxProps } from '../Box';
import { VisuallyHidden } from '../VisuallyHidden';

type State = ReturnType<typeof useFieldIds> | undefined;
const Context = createContext<State>(undefined);

type NativeFormProps = AllHTMLAttributes<HTMLFormElement>;

export type FieldBaseProps = {
  description?: ReactNode;
  error?: ReactNode;
  hideLabel?: boolean;
  label: ReactNode;
  required?: NativeFormProps['required'];
  width?: BoxProps['width'];
};

type Props = FieldBaseProps & {
  children: ReactElement | ((context: State) => ReactNodeNoStrings);
  id?: NativeFormProps['id'];
};

export const Field = ({
  children,
  description,
  error,
  hideLabel,
  id,
  label,
  required,
  width = 'full',
}: Props) => {
  const ids = useFieldIds({
    id,
    description: description !== undefined,
    error: error !== undefined,
  });

  const labelContent = (
    <Box
      alignItems="flex-end"
      display="flex"
      justifyContent="space-between"
      paddingX="4"
    >
      <Box
        as="label"
        color="textSecondary"
        fontSize="0"
        fontWeight={500}
        {...ids.label}
      >
        {label} {required && <VisuallyHidden>(required)</VisuallyHidden>}
      </Box>
    </Box>
  );

  // Allow children to consume ids or try to clone ids onto it
  let content: ReactNode | null;
  if (typeof children === 'function')
    content = (
      <Context.Provider value={ids}>
        <Context.Consumer>{context => children(context)}</Context.Consumer>
      </Context.Provider>
    );
  else if (children) content = cloneElement(children, ids.content);
  else content = children;

  return (
    <Box display="flex" flexDirection="column" gap="3" width={width}>
      {hideLabel ? (
        <VisuallyHidden>{labelContent}</VisuallyHidden>
      ) : (
        <Box paddingTop="3">{labelContent}</Box>
      )}

      {content}

      <Box display="flex" flexDirection="column" gap="4" width={width}>
        {description && (
          <Box
            color="textTertiary"
            fontSize="0"
            paddingX="4"
            {...ids.description}
            height="3"
          >
            {description}
          </Box>
        )}

        {error && (
          <Box
            aria-live="polite"
            color="redPrimary"
            fontSize="0"
            paddingX="4"
            height="3"
            {...ids.error}
          >
            {error}
          </Box>
        )}
      </Box>
    </Box>
  );
};
