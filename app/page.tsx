import { Test } from '@/app/components/atoms/Test';
import { ThemeSwitcher } from '@/app/components/atoms/ThemeSwitcher';

export default function Home() {
  return (
    <div>
      homepage
      <ThemeSwitcher />
      <Test />
    </div>
  );
}
