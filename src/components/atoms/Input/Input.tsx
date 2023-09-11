import {
  AllHTMLAttributes,
  ChangeEvent,
  EventHandler,
  FormEvent,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactElement,
  Ref,
  RefObject,
  useCallback,
  useRef,
  useState,
  WheelEvent,
} from 'react';

import { Box, BoxProps } from '../Box';
import { Field, FieldBaseProps } from '../Field';
import { useTheme } from '../ThemeProvider';
import * as styles from './input.css';

type NativeInputProps = AllHTMLAttributes<HTMLInputElement>;

type BaseProps = FieldBaseProps & {
  autoFocus?: NativeInputProps['autoFocus'];
  autoComplete?: NativeInputProps['autoComplete'];
  autoCorrect?: NativeInputProps['autoCorrect'];
  defaultValue?: string | number;
  disabled?: boolean;
  id?: NativeInputProps['id'];
  inputMode?: NativeInputProps['inputMode'];
  name?: string;
  placeholder?: NativeInputProps['placeholder'];
  leftIcon?: ReactElement;
  readOnly?: NativeInputProps['readOnly'];
  spellCheck?: NativeInputProps['spellCheck'];
  rightIcon?: ReactElement;
  tabIndex?: NativeInputProps['tabIndex'];
  textTransform?: BoxProps['textTransform'];
  type?: 'email' | 'number' | 'text' | 'datetime-local';
  units?: string;
  value?: string | number;
  onBlur?: NativeInputProps['onBlur'];
  onChange?: EventHandler<ChangeEvent<HTMLInputElement>>;
  onFocus?: NativeInputProps['onFocus'];
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  uppercase?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'xs';
  variant?: 'filled' | 'flushed' | 'outline';
};

type WithTypeEmail = {
  type?: 'email';
};

type WithTypeText = {
  type?: 'text';
  maxLength?: NativeInputProps['maxLength'];
};

type WithTypeNumber = {
  type?: 'number';
  max?: NativeInputProps['max'];
  min?: NativeInputProps['min'];
  step?: NativeInputProps['step'];
};

type WithTypeDateTime = {
  type?: 'datetime-local';
  max?: NativeInputProps['max'];
  min?: NativeInputProps['min'];
};

type Props = BaseProps &
  (WithTypeEmail | WithTypeText | WithTypeNumber | WithTypeDateTime);

export const Input = forwardRef(
  (
    {
      autoFocus,
      autoComplete,
      autoCorrect,
      defaultValue,
      description,
      disabled,
      error,
      hideLabel,
      id,
      inputMode,
      label,
      name,
      placeholder,
      leftIcon,
      readOnly,
      required,
      spellCheck,
      rightIcon,
      tabIndex,
      textTransform,
      type = 'text',
      units,
      value,
      width,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      size = 'md',
      variant = 'outline',
      ...props
    }: Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as RefObject<HTMLInputElement>) || defaultRef;
    const theme = useTheme();

    const [state, setState] = useState<{
      ghostValue?: Props['value'];
    }>({ ghostValue: value || defaultValue });

    const placeholderText = placeholder
      ? `${placeholder ?? ''}${units ? ` ${units}` : ''}`
      : undefined;
    const hasError = error ? true : undefined;
    const className = styles.variants({
      size: size,
      leftIcon: leftIcon ? true : undefined,
      rightIcon: rightIcon ? true : undefined,
    });
    const max = (props as WithTypeNumber).max;
    const inputType = type === 'number' ? 'number' : 'text';

    const handleInput = useCallback((event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement).value;
      setState(x => ({ ...x, ghostValue: value }));
    }, []);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (type === 'number') {
          const key = event.key;
          const filteredKeys = ['E', 'e', '+'];
          if (filteredKeys.includes(key)) event.preventDefault();
        }
        onKeyDown && onKeyDown(event);
      },
      [type, onKeyDown],
    );

    const handleWheel = useCallback((event: WheelEvent<HTMLElement>) => {
      (event.target as HTMLElement)?.blur();
    }, []);

    const handleMax = useCallback(() => {
      if (onChange)
        onChange({
          target: { value: max },
        } as ChangeEvent<HTMLInputElement>);
      else if (inputRef.current) inputRef.current.value = max as string;
      if (!units) return;
      setState(x => ({ ...x, ghostValue: max }));
    }, [inputRef, max, units, onChange]);

    return (
      <Field
        description={description}
        error={error}
        hideLabel={hideLabel}
        id={id}
        label={label}
        required={required}
        width={width}
        size={size}
      >
        {ids => (
          <Box
            className={[
              styles.root({
                disabled,
                error: hasError,
                size: size,
                variant: variant,
              }),
            ]}
          >
            {leftIcon && (
              <Box
                aria-hidden="true"
                as="label"
                className={styles.leftIcon({
                  size: size,
                })}
                {...ids?.label}
              >
                {leftIcon}
              </Box>
            )}

            <Box overflow="hidden" position="relative" width="full">
              <Box
                aria-invalid={hasError}
                as="input"
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                className={[
                  className,
                  styles.input({
                    size: size,
                    variant: variant,
                    disabled,
                    type: inputType,
                    theme: theme.mode,
                    uppercase: props.uppercase,
                  }),
                ]}
                defaultValue={defaultValue}
                disabled={disabled}
                inputMode={inputMode}
                name={name}
                placeholder={placeholderText}
                readOnly={readOnly}
                ref={inputRef}
                spellCheck={spellCheck}
                tabIndex={tabIndex}
                textTransform={textTransform}
                type={type}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                onInput={handleInput}
                onKeyDown={type === 'number' ? handleKeyDown : onKeyDown}
                onWheel={type === 'number' ? handleWheel : undefined}
                {...props}
                {...ids?.content}
              />

              {units && state.ghostValue && (
                <Box
                  aria-hidden="true"
                  className={[
                    className,
                    styles.ghost({
                      type: inputType,
                    }),
                  ]}
                  data-testid="ghost"
                >
                  <Box
                    as="span"
                    textTransform={textTransform}
                    visibility="hidden"
                  >
                    {state.ghostValue}{' '}
                  </Box>
                  <Box as="span" color="textPrimary">
                    {units}
                  </Box>
                </Box>
              )}
            </Box>

            {max && type === 'number' && (
              <Box
                alignItems="center"
                display="flex"
                paddingRight={rightIcon ? undefined : '4'}
              >
                <Box as="button" className={styles.max} onClick={handleMax}>
                  Max
                </Box>
              </Box>
            )}

            {rightIcon && (
              <Box
                aria-hidden="true"
                as="label"
                className={styles.rightIcon}
                {...ids?.label}
              >
                {rightIcon}
              </Box>
            )}
          </Box>
        )}
      </Field>
    );
  },
);

Input.displayName = 'Input';
