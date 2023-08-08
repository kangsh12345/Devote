import Test from './components/Test/Test';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import Text from './components/Typography/Text';

export default function Home() {
  return (
    <div>
      <ThemeSwitcher />
      <Test />
      <Text size="h1" weight="bold" color="brandPrimary">
        Text테스트
      </Text>
    </div>
  );
}
