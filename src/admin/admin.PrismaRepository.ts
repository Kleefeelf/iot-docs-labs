import { PrismaService } from 'src/prisma/prisma.service';
import { AdminRepository } from './admin.repository';
import { Injectable } from '@nestjs/common';
import { StoreApp } from '@prisma/client';
import { AppDto } from 'src/dto/app.dto';

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async verifyApp(id: string, app: AppDto): Promise<StoreApp> {
    const existingApp = await this.prisma.storeApp.findUnique({
      where: { id: parseInt(id) },
    });
    if (existingApp && app) {
      const { isVerified } = app;
      return await this.prisma.storeApp.update({
        where: {
          id: parseInt(id),
        },
        data: {
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
