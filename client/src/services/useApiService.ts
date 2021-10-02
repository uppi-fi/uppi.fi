import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { ResponseStatus } from "../types";
import { getServerUrl } from "../utils/url";

export interface ApiResponse<T> {
  status: ResponseStatus;
  message?: string;
  data?: T;
}

export function useApiService<TResponse>(path: string) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<ResponseStatus | null>(null);
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<boolean>(false);

  const request = async <TDataOrParams>(
    method: "GET" | "POST",
    data?: TDataOrParams,
    config?: AxiosRequestConfig,
  ) => {
    setError(false);
    const url = getServerUrl(path);

    try {
      const res =
        method === "POST"
          ? await axios.post<ApiResponse<TResponse>>(url, data, config)
          : await axios.get<ApiResponse<TResponse>>(url, {
              params: data,
              ...config,
            });
      const { status, message } = res.data;

      if (status === ResponseStatus.Error) {
        if (message) {
          setErrorMessage(message);
        }
        throw new Error();
      }

      setData(res.data.data || null);
      setStatus(status);
      return res.data;
    } catch (err) {
      setError(true);
      console.error({ err, path, method, data, config });
      throw new Error("API error");
    }
  };

  const get = async <TParams>(params?: TParams, config?: AxiosRequestConfig) =>
    request("GET", params, config);
  const post = async <TData>(data?: TData, config?: AxiosRequestConfig) =>
    request("POST", data, config);

  return {
    get,
    post,
    status,
    data,
    error,
    errorMessage,
  };
}
