import { User } from '@prisma/client';
import { userDto } from 'src/dto/user.dto';

export interface StoreUserRepository {
  readCSV(): Promise<void>;
  createUser(user: userDto): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
  updateUser(id: string, user: userDto): Promise<User>;
  deleteUserById(id: string): Promise<void>;
}
