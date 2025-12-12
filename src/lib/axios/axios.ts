import axios, { AxiosError } from 'axios';

import { ApiError, type ApiErrorResponse } from '@/error/error';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.data && !error.response.data.success) {
      const errorResponse = error.response.data as ApiErrorResponse;
      const apiError = ApiError.fromErrorInfo(errorResponse.error);
      return Promise.reject(apiError);
    }

    if (error.request && !error.response) {
      const networkError = new ApiError({
        message: '네트워크 연결에 실패했습니다.',
        code: 'ERR_NETWORK',
        statusCode: 0,
      });
      return Promise.reject(networkError);
    }

    const unknownError = new ApiError({
      message: error.message || '알 수 없는 오류가 발생했습니다.',
      code: 'ERR_UNKNOWN',
      statusCode: error.response?.status || 500,
    });
    return Promise.reject(unknownError);
  },
);

export default axiosInstance;
