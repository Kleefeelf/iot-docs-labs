import { Injectable } from '@nestjs/common';
import { StoreAdminRepository } from './storeAdmin.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminDto } from 'src/dto/Admin.dto';
import { Admin } from '@prisma/client';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class PrismaAdminRepository implements StoreAdminRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV() {
    try {
      const stream = fs
        .createReadStream('./src/csv/admins.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const admin: Admin = {
          id: row['_0'],
          adminUsername: row['_1'],
          email: row['_2'],
          adminPassword: row['_3'],
        };
        await this.createAdmin(admin);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err.message}`,
      );
    }
  }

  async createAdmin(Admin: AdminDto): Promise<Admin> {
    const { adminUsername, email, adminPassword } = Admin;
    const createdAdmin = await this.prisma.admin.create({
      data: {
        adminUsername,
        email,
        adminPassword,
      },
    });
    return createdAdmin;
  }

  async getAdmins(): Promise<Admin[]> {
    return await this.prisma.admin.findMany();
  }

  async getAdminById(id: string): Promise<Admin | null> {
    return await this.prisma.admin.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateAdmin(id: string, Admin: AdminDto): Promise<Admin> {
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { id: parseInt(id) },
    });

    if (existingAdmin && Admin) {
      const { adminUsername, email, adminPassword } = Admin;
      return await this.prisma.admin.update({
        where: { id: parseInt(id) },
        data: {
          adminUsername,
          email,
          adminPassword,
        },
      });
    } else {
      throw new Error('Admin not found or not defined');
    }
  }

  async deleteAdminById(id: string): Promise<void> {
    await this.prisma.admin.delete({
      where: { id: parseInt(id) },
    });
  }
}
