import { axiosInstance } from './axios';

import { UserUpdatePayload } from '../validation/user';

export const updateUser = async (data: UserUpdatePayload) => {
  const response = await axiosInstance.patch('/api/user', data);
  return response.data.data;
};
