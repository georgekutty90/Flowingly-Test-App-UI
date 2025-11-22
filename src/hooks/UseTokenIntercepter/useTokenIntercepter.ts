import { useEffect } from 'react';
import axiosInstance from "../../api/client";

import type {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

const useTokenIntercepter = (): void => {
  useEffect(() => {
    const id = axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.method === 'post') {
          if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders;
          }

          config.headers['Content-Type'] = 'application/json';
          const appKey = import.meta.env.VITE_APP_APP_KEY;
          if (appKey) {
            config.headers['ApplicationKey'] = appKey;
          }
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error),
    );

    return () => {
      axiosInstance.interceptors.request.eject(id);
    };
  }, []);
};

export default useTokenIntercepter;