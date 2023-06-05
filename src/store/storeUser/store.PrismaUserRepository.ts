import { Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import { User } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StoreUserRepository } from './storeUser.repository';
import { userDto } from 'src/dto/user.dto';

@Injectable()
export class PrismaUserRepository implements StoreUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV() {
    try {
      const stream = fs
        .createReadStream('./src/csv/users.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const user: User = {
          id: row['_0'],
          username: row['_1'],
          email: row['_2'],
          password: row['_3'],
          firstName: row['_4'] || null,
          lastName: row['_5'] || null,
        };
        await this.createUser(user);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err.message}`,
      );
    }
  }

  async createUser(user: userDto): Promise<User> {
    const { username, email, password, firstName, lastName } = user;
    const createdUser = await this.prisma.user.create({
      data: {
        username,
        email,
        password,
        firstName,
        lastName,
      },
    });
    return createdUser;
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateUser(id: string, user: userDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (existingUser && user) {
      const { username, email, password, firstName, lastName } = user;
      return await this.prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          username,
          email,
          password,
          firstName,
          lastName,
        },
      });
    } else {
      throw new Error('User not found or not defined');
    }
  }

  async deleteUserById(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: parseInt(id) },
    });
  }
}
