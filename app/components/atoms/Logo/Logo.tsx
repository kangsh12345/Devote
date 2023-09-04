import { Text } from '@/app/components/atoms/Typography';

export interface LogoProps {
  size?: 'xl' | 'lg' | 'md' | 'sm';
}

export const Logo = ({ size = 'md' }: LogoProps) => {
  const logoSize =
    size === 'xl'
      ? 'h1'
      : size === 'lg'
      ? 'h2'
      : size === 'md'
      ? 'h3'
      : size === 'sm'
      ? 'h4'
      : 'h3';

  return (
    <Text size={logoSize} weight="bold" color="textPrimary">
      Devote
    </Text>
  );
};
