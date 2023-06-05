import { Module } from '@nestjs/common';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { DEVELOPER_REPOSITORY } from 'src/constants/constants';
import { PrismaDeveloperRepository } from './developer.PrismaRepository';

@Module({
  controllers: [DeveloperController],
  providers: [
    DeveloperService,
    {
      provide: DEVELOPER_REPOSITORY,
      useClass: PrismaDeveloperRepository,
    },
  ],
})
export class DeveloperModule {}
