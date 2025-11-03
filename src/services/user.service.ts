import { UserPayload } from '@/lib/validation/user';
import { userRepository } from '@/repositories/user.repository';

export class UserService {
  async createUser(data: UserPayload) {
    return await userRepository.Create(data);
  }

  async findOrCreateUser(data: UserPayload) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      return existingUser;
    }

    return await userRepository.Create(data);
  }
}

export const userService = new UserService();
