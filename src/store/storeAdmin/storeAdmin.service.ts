import { Inject, Injectable } from '@nestjs/common';
import { StoreAdminRepository } from './storeAdmin.repository';
import { STORE_ADMIN_REPOSITORY } from 'src/constants/constants';
import { AdminDto } from 'src/dto/Admin.dto';
import { Admin } from '@prisma/client';

@Injectable()
export class StoreAdminService {
  constructor(
    @Inject(STORE_ADMIN_REPOSITORY)
    private readonly storeRepository: StoreAdminRepository,
  ) {}

  async createAdmin(Admin: AdminDto): Promise<Admin> {
    return await this.storeRepository.createAdmin(Admin);
  }

  async getAdmins() {
    return await this.storeRepository.getAdmins();
  }

  async getAdminById(id: string) {
    return await this.storeRepository.getAdminById(id);
  }

  async updateAdmin(id: string, Admin: AdminDto) {
    return await this.storeRepository.updateAdmin(id, Admin);
  }

  async deleteAdmin(id: string) {
    return await this.storeRepository.deleteAdminById(id);
  }

  async readCsv() {
    return await this.storeRepository.readCSV();
  }
}
