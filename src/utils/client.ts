import axios, { AxiosResponse } from 'axios';

export const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_API_DEVELOPMENT
      : process.env.NEXT_PUBLIC_API_PRODUCTION,
  headers: { 'Content-Type': 'application/json' },
});

// export function setHttpClientBearerAuthorization(bearerToken: string) {
//   instance.defaults.headers.common['authorization'] = `Bearer ${bearerToken}`;
// }

export function httpGetClient<T>(...args: Parameters<typeof instance.get>) {
  return instance
    .get(...args)
    .then((res: AxiosResponse<T>) => {
      return res.data;
    })
    .catch(err => {
      throw new Error(
        err?.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.',
      );
    });
}

export function httpPostClient<T>(...args: Parameters<typeof instance.post>) {
  return instance
    .post(...args)
    .then((res: AxiosResponse<T>) => {
      return res.data;
    })
    .catch(err => {
      throw new Error(
        err?.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.',
      );
    });
}

export function httpPutClient<T>(...args: Parameters<typeof instance.put>) {
  return instance
    .put(...args)
    .then((res: AxiosResponse<T>) => {
      return res.data;
    })
    .catch(err => {
      throw new Error(
        err?.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.',
      );
    });
}

export function httpPatchClient<T>(...args: Parameters<typeof instance.patch>) {
  return instance
    .patch(...args)
    .then((res: AxiosResponse<T>) => {
      return res.data;
    })
    .catch(err => {
      throw new Error(
        err?.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.',
      );
    });
}

export function httpDeleteClient<T>(
  ...args: Parameters<typeof instance.delete>
) {
  return instance
    .delete(...args)
    .then((res: AxiosResponse<T>) => {
      return res.data;
    })
    .catch(err => {
      throw new Error(
        err?.response?.data?.message ?? '알 수 없는 오류가 발생했습니다.',
      );
    });
}
