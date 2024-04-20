import { Box } from '../Box';

export interface LogoProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
}

export const Logo = ({ size = 'md' }: LogoProps) => {
  const logoSize =
    size === 'xl'
      ? '10'
      : size === 'lg'
        ? '7'
        : size === 'md'
          ? '5'
          : size === 'sm'
            ? '3'
            : '5';

  return (
    <Box fontSize={logoSize} fontWeight={700} color="textPrimary">
      Devote
    </Box>
  );
};
