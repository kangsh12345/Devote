import { CopyRight } from './components/atoms/CopyRight';
import { Logo } from './components/atoms/Logo';
import Test from './components/atoms/Test/Test';
import { ThemeSwitcher } from './components/atoms/ThemeSwitcher';
import Text from './components/atoms/Typography/Text';

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />
      <Test />
      <Text size="h1" weight="bold" color="brandPrimary">
        Text테스트
      </Text>
      <Logo size="md" />
      <CopyRight size="md" />
    </div>
  );
}
