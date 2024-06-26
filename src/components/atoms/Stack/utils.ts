import {
  mapResponsiveValue,
  OptionalResponsiveObject,
  OptionalResponsiveValue,
} from '@/src/css';

export type Direction = 'horizontal' | 'vertical';

const directionToFlexDirectionLookup = {
  horizontal: 'row',
  vertical: 'column',
} as const;

export const directionToFlexDirection = (
  direction: OptionalResponsiveValue<Direction> | undefined,
) =>
  direction
    ? mapResponsiveValue(
        direction,
        value => directionToFlexDirectionLookup[value],
      )
    : undefined;

type Wrap = 1 | 0;

const wrapToFlexWrapLookup = {
  1: 'wrap',
  0: 'nowrap',
} as const;

export const wrapToFlexWrap = (
  wrap: OptionalResponsiveObject<true | false> | undefined,
) =>
  wrap
    ? typeof wrap === 'boolean'
      ? wrapToFlexWrapLookup[1]
      : mapResponsiveValue(
          wrap as any,
          value => wrapToFlexWrapLookup[Number(value) as Wrap],
        )
    : undefined;
