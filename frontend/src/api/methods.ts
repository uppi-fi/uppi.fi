import axios, { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
import defaultsDeep from 'lodash-es/defaultsDeep';

export const GET =
  <ResponseType = unknown>(url: string, defaultConfig?: AxiosRequestConfig) =>
  (configOverride?: AxiosRequestConfig) => {
    return axios.get<unknown, AxiosResponse<ResponseType>>(
      '/api/' + url,
      defaultsDeep(configOverride, defaultConfig)
    );
  };

export const POST = <ResponseType = unknown>(
  ...args: Parameters<Axios['post']>
) => {
  return axios.post<unknown, ResponseType>(...args);
};

export const DELETE = <ResponseType = unknown>(
  ...args: Parameters<Axios['delete']>
) => {
  return axios.delete<unknown, ResponseType>(...args);
};
