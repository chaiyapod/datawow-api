import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findUserByUsername(
    username: string,
  ): Promise<UserEntity | null> {
    return await this.userRepository.findByUsername(username);
  }
}
