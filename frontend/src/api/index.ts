import { jwtTokenState } from '@frontend/state/jwtTokenState';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ResponseStatus } from '../types';

export interface ApiResponse<T> {
  status: ResponseStatus;
  message?: string;
  data?: T;
}

export function useApi<TResponse>(
  apiFunction: (
    config?: AxiosRequestConfig<unknown> | undefined
  ) => Promise<AxiosResponse<TResponse>>
) {
  const jwtToken = useRecoilValue(jwtTokenState);
  const [status, setStatus] = useState<ResponseStatus | null>(null);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const configWithAuth: AxiosRequestConfig = {
      headers: {
        ...(jwtToken ? { Authorization: jwtToken } : {}),
      },
    };

    apiFunction({
      params: data,
      ...configWithAuth,
    })
      .then((res) => {
        setData(res.data);
        setStatus(ResponseStatus.Ok);
      })
      .catch((e) => {
        setStatus(ResponseStatus.Error);
        setError(e);
        throw new Error(`${apiFunction.name} failed to fetch`);
      });
  }, [apiFunction, data, jwtToken]);

  return {
    status,
    data,
    error,
  };
}

export * from './requests';
