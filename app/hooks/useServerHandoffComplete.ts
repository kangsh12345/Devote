import { useEffect, useState } from 'react';

const state = { serverHandoffComplete: false };

export const useServerHandoffComplete = () => {
  const [serverHandoffComplete, setServerHandoffComplete] = useState(
    state.serverHandoffComplete,
  );

  useEffect(() => {
    if (serverHandoffComplete) return;
    setServerHandoffComplete(true);
  }, [serverHandoffComplete]);

  useEffect(() => {
    if (state.serverHandoffComplete) return;
    state.serverHandoffComplete = true;
  }, []);

  return serverHandoffComplete;
};
