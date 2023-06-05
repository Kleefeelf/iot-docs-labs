import { Module } from '@nestjs/common';
import { UserService } from './user.service';

import { UserController } from './user.controller';
import { USER_REPOSITORY } from 'src/constants/constants';
import { PrismaUserRepository } from './user.PrismaRepository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserModule {}
