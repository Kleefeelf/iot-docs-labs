import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ADMIN_REPOSITORY } from 'src/constants/constants';
import { PrismaAdminRepository } from './admin.PrismaRepository';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    {
      provide: ADMIN_REPOSITORY,
      useClass: PrismaAdminRepository,
    },
  ],
})
export class AdminModule {}
