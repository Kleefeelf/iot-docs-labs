import { Inject, Injectable } from '@nestjs/common';
import { StoreUserRepository } from './storeUser.repository';
import { User } from '@prisma/client';
import { userDto } from 'src/dto/user.dto';
import { STORE_USER_REPOSITORY } from 'src/constants/constants';

@Injectable()
export class StoreUserService {
  constructor(
    @Inject(STORE_USER_REPOSITORY)
    private readonly storeRepository: StoreUserRepository,
  ) {}

  async createUser(user: userDto): Promise<User> {
    return await this.storeRepository.createUser(user);
  }

  async getUsers() {
    return await this.storeRepository.getUsers();
  }

  async getUserById(id: string) {
    return await this.storeRepository.getUserById(id);
  }

  async updateUser(id: string, user: userDto) {
    return await this.storeRepository.updateUser(id, user);
  }

  async deleteUser(id: string) {
    return await this.storeRepository.deleteUserById(id);
  }

  async readCsv() {
    return await this.storeRepository.readCSV();
  }
}
