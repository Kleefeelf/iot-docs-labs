import { Injectable } from '@nestjs/common';
import { StoreDeveloperRepository } from './storeDeveloper.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeveloperDto } from 'src/dto/developer.dto';
import { Developer } from '@prisma/client';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class PrismaDeveloperRepository implements StoreDeveloperRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV() {
    try {
      const stream = fs
        .createReadStream('./src/csv/developers.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const developer: Developer = {
          id: row['_0'],
          username: row['_1'],
          email: row['_2'],
          password: row['_3'],
        };
        await this.createDeveloper(developer);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err.message}`,
      );
    }
  }

  async createDeveloper(developer: DeveloperDto): Promise<Developer> {
    const { username, email, password } = developer;
    const createdDeveloper = await this.prisma.developer.create({
      data: {
        username,
        email,
        password,
      },
    });
    return createdDeveloper;
  }

  async getDevelopers(): Promise<Developer[]> {
    return await this.prisma.developer.findMany();
  }

  async getDeveloperById(id: string): Promise<Developer | null> {
    return await this.prisma.developer.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateDeveloper(
    id: string,
    developer: DeveloperDto,
  ): Promise<Developer> {
    const existingDeveloper = await this.prisma.developer.findUnique({
      where: { id: parseInt(id) },
    });

    if (existingDeveloper && developer) {
      const { username, email, password } = developer;
      return await this.prisma.developer.update({
        where: { id: parseInt(id) },
        data: {
          username,
          email,
          password,
        },
      });
    } else {
      throw new Error('Developer not found or not defined');
    }
  }

  async deleteDeveloperById(id: string): Promise<void> {
    await this.prisma.developer.delete({
      where: { id: parseInt(id) },
    });
  }
}
