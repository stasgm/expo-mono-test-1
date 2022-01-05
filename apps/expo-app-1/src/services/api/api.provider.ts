import axios, { AxiosError } from 'axios';

import { services } from '../../constants/constants';
import { IApiErrorResponse, IApiResponse } from './types';

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

const handleError = (error: AxiosError): IApiErrorResponse => {
  // const { statusCode } = error.response?.data;

  // if (statusCode === 401) {
  //   return { success: false, data: { error: 'No permissions' } };
  // } else if (statusCode === 400) {
  //   return { success: false, data: error.response?.data } as IApiErrorResponse;
  // } else {
  //   throw error;
  // }

  return {
    success: false,
    data: {
      error: error.message,
    },
  };
};

const handleResponse = <T>(res: T): IApiResponse<T> => {
  return {
    success: true,
    data: res,
  };
};

export const apiProvider = <T>(endpoint: string) => {
  const api = axios.create(axiosConfigV1);

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
