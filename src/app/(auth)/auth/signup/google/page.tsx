'use client';

import { Box } from '@/src/components/atoms/Box';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function Google() {
  return (
    <Box>
      <GoogleOAuthProvider clientId={String(process.env.GOOGLE_CLIENT_ID)}>
        <Box>
          <GoogleLogin
            onSuccess={credentialResponse => {
              fetch(
                `/api/auth/sign-up/google?credential=${credentialResponse.credential}`,
              ).then(data => console.log(data));
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </Box>
      </GoogleOAuthProvider>
    </Box>
  );
}
