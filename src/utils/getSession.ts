import { getServerSession } from 'next-auth';

import { authOptions } from './auth';

export async function getSession() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      console.log('No active session found.');
      return null;
    }

    console.log('Session found:', session);
    return session;
  } catch (error) {
    console.error('Error retrieving session:', error);
    return null;
  }
}
