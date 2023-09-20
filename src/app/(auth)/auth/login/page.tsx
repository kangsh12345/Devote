import { Box } from '@/src/components/atoms/Box';
import { GoogleLoginButton } from '@/src/components/atoms/Button';
import { Header } from '@/src/components/organisms/Header';

export default function Login() {
  return (
    <Box>
      <Header type="auth" />
      <GoogleLoginButton />
    </Box>
  );
}
