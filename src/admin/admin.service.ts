import { Inject, Injectable } from '@nestjs/common';
import { ADMIN_REPOSITORY } from 'src/constants/constants';
import { AppDto } from 'src/dto/app.dto';
import { AdminRepository } from './admin.repository';
import { StoreApp } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(
    @Inject(ADMIN_REPOSITORY)
    private readonly adminRepository: AdminRepository,
  ) {}

  async verifyApp(id: string, app: AppDto): Promise<StoreApp> {
    return await this.adminRepository.verifyApp(id, app);
  }

  async deleteAppById(id: string): Promise<void> {
    return await this.adminRepository.deleteAppById(id);
  }
}
