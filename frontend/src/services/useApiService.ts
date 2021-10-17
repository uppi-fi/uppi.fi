import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useState } from 'react';
import { ResponseStatus } from '../types';

export interface ApiResponse<T> {
  status: ResponseStatus;
  message?: string;
  data?: T;
}

export function useApiService<TResponse, TDataOrParams = unknown>(
  path: string
) {
  const [status, setStatus] = useState<ResponseStatus | null>(null);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<any>();

  const request = useCallback(
    async (
      method: 'GET' | 'POST',
      data?: TDataOrParams,
      config?: AxiosRequestConfig
    ) => {
      setError(false);
      const url = '/api/' + path;

      try {
        const res =
          method === 'POST'
            ? await axios.post(url, data, config)
            : await axios.get(url, {
                params: data,
                ...config,
              });
        const responseOk = res.status === 200;

        if (responseOk) {
          setStatus(ResponseStatus.Ok);
        } else {
          setStatus(ResponseStatus.Error);
          console.error({
            res,
          });
          throw new Error(`${method} request failed to url: ${url}`);
        }

        setData(res.data);
        return res.data;
      } catch (err) {
        setError(err);
        console.error({ err, path, method, data, config });
        throw new Error('API error');
      }
    },
    [path, status]
  );

  const get = useCallback(
    async (params?: TDataOrParams, config?: AxiosRequestConfig) =>
      request('GET', params, config),
    [request]
  );
  const post = useCallback(
    async (data?: TDataOrParams, config?: AxiosRequestConfig) =>
      request('POST', data, config),
    [request]
  );

  return {
    get,
    post,
    status,
    data,
    error,
  };
}
