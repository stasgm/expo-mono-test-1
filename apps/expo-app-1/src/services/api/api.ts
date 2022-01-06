import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { services } from '../../constants';
import storage from '../../utils/storage';
import { IApiErrorResponse, IApiResponse, IErrorMessage } from './types';

const baseAxiosConfig = {
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosConfigV1 = Object.assign(
  {
    baseURL: services.baseUrl,
  },
  baseAxiosConfig,
);

function authRequestInterceptor(config: AxiosRequestConfig = {}) {
  const token = storage.getToken();
  if (config.headers) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = 'application/json';
  }
  return config;
}

const handleError = (error: AxiosError): IApiErrorResponse => {
  const { statusCode } = error.response?.data;

  if (error.message === 'Network Error') {
    return { success: false, data: { error: 'Network Error' } };
  }

  if (statusCode === 401) {
    return { success: false, data: { error: 'No permissions' } };
  }

  if (statusCode === 400) {
    return { success: false, data: error.response?.data } as IApiErrorResponse;
  }

  if (statusCode === 500) {
    console.log("error", error)
    return { success: false, data: { error: error.message } } as IApiErrorResponse;
  }

  throw error;
};

const handleResponse = <T>(res: T): IApiResponse<T> => {
  return {
    success: true,
    data: res,
  };
};

export const apiProvider = <T>(endpoint: string) => {
  const api = axios.create(axiosConfigV1);

  axios.interceptors.request.use(authRequestInterceptor);
  axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log('error message', message)
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    return Promise.reject(error);
  },
);


  const getCommonOptions = () => {
    return {};
  };

  const getAll = async (options = {}): Promise<IApiResponse<T[]> | IApiErrorResponse> => {
    try {
      const res = await api.get<T[]>(`${endpoint}`, { ...options, ...getCommonOptions() });
      return handleResponse<T[]>(res.data);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const get = async (options = {}): Promise<IApiResponse<T> | IApiErrorResponse> => {
    try {
      const res = await axios.get<T>(`${endpoint}`, { ...options, ...getCommonOptions() });
      return handleResponse<T>(res.data);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const post = async (endpoint: string, data = {}, options = {}): Promise<IApiResponse<T> | IApiErrorResponse> => {
    try {
      const res = await api.post<T>(`${endpoint}`, data, { ...options, ...getCommonOptions() });
      return handleResponse<T>(res.data);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const remove = async (options = {}): Promise<IApiResponse<T> | IApiErrorResponse> => {
    try {
      const res = await axios.delete<T>(`${endpoint}`, { ...options, ...getCommonOptions() });
      return handleResponse<T>(res.data);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  const patch = async (data = {}, options = {}): Promise<IApiResponse<T> | IApiErrorResponse> => {
    try {
      const res = await axios.patch<T>(`${endpoint}`, data, { ...options, ...getCommonOptions() });
      return handleResponse<T>(res.data);
    } catch (error) {
      return handleError(error as AxiosError);
    }
  };

  return { getAll, get, post, remove, patch };
};
