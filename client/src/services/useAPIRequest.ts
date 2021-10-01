import axios, { AxiosRequestConfig, Method } from "axios";
import { useState } from "react";
import { getServerUrl } from "../utils/url";

export function useAPIRequest<TData>(path: string) {
  const [data, setData] = useState<TData>();
  const [error, setError] = useState(false);

  const request = async (
    method: Method,
    data: any,
    config?: AxiosRequestConfig,
  ) => {
    try {
      const res = await axios.request<TData>({
        url: getServerUrl(path),
        method,
        data: method === "POST" ? data : undefined,
        params: method === "GET" ? data : undefined,
        ...config,
      });
      setData(res.data);
    } catch (e: unknown) {
      setError(true);
    }
  };

  const get = async (params: any, config?: AxiosRequestConfig) =>
    request("get", params, config);
  const post = async (data: any, config?: AxiosRequestConfig) =>
    request("post", data, config);

  return { post, get, data, error };
}
