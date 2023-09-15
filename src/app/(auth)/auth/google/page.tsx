'use client';

import { Box } from '@/src/components/atoms/Box';
import { GoogleLogin } from '@react-oauth/google';

export default function Google() {
  return (
    <Box>
      <GoogleLogin
        onSuccess={credentialResponse => {
          fetch(
            `/api/auth/sign-in?credential=${credentialResponse.credential}`,
          ).then(data => console.log(data));
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </Box>
  );
}
