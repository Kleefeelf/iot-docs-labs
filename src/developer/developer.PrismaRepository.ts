import { Injectable } from '@nestjs/common';
import { DeveloperRepository } from './developer.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppDto } from 'src/dto/App.dto';
import { StoreApp } from '@prisma/client';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class PrismaDeveloperRepository implements DeveloperRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV() {
    try {
      const stream = fs
        .createReadStream('./src/csv/apps.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }
        const app: StoreApp = {
          id: row['_0'],
          name: row['_1'],
          category: row['_2'],
          description: row['_3'],
          rating: parseInt(row['_4']),
          price: parseInt(row['_5']),
          downloads: parseInt(row['_6']),
          isVerified: row['_7'],
          developerId: parseInt(row['_8']),
        };
        await this.createApp(app);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err.message}`,
      );
    }
  }

  async createApp(app: AppDto): Promise<StoreApp> {
    const {
      name,
      category,
      description,
      developerId,
      rating,
      price,
      downloads,
    } = app;
    const createdApp = await this.prisma.storeApp.create({
      data: {
        name,
        category,
        description,
        rating,
        price,
        downloads,
        isVerified: false,
        developer: { connect: { id: developerId } }, // встановлення зв'язку між додатком та розробником
      },
    });
    return createdApp;
  }

  async getApps(): Promise<StoreApp[]> {
    return await this.prisma.storeApp.findMany({
      // include: {
      //   reviews: true,
      // },
    });
  }

  async getAppById(id: string): Promise<StoreApp | null> {
    return await this.prisma.storeApp.findUnique({
      where: { id: parseInt(id) },
      include: {
        reviews: true,
      },
    });
  }

  async updateApp(id: string, App: AppDto): Promise<StoreApp> {
    const existingApp = await this.prisma.storeApp.findUnique({
      where: { id: parseInt(id) },
    });

    if (existingApp && App) {
      const {
        name,
        category,
        description,
        developerId,
        rating,
        price,
        downloads,
        isVerified,
      } = App;
      return await this.prisma.storeApp.update({
        where: { id: parseInt(id) },
        data: {
          name,
          category,
          description,
          developerId,
          rating,
          price,
          downloads,
          isVerified,
        },
      });
    } else {
      throw new Error('App not found or not defined');
    }
  }

  async deleteAppById(id: string): Promise<void> {
    await this.prisma.storeApp.delete({
      where: { id: parseInt(id) },
    });
  }
}
