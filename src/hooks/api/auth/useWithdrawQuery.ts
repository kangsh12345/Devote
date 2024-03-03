import { httpGetClient } from '@/src/utils/client';
import { useQuery } from '@tanstack/react-query';

const WithDrawQueryKey = '/api/auth/withdraw';

export interface WithdrawQueryResponse {
  message: string;
  success: boolean;
}

export function useWithdrawQuery() {
  return useQuery(
    [WithDrawQueryKey],
    () => {
      return httpGetClient<WithdrawQueryResponse>(WithDrawQueryKey);
    },
    { enabled: false },
  );
}
