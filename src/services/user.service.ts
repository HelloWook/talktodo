import { UserPayload } from '@/lib/validation/user';
import { userRepository } from '@/repositories/user.repository';

export class UserService {
  async createUser(data: UserPayload) {
    return await userRepository.Create(data);
  }
}

export const userService = new UserService();
