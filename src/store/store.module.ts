import { Module } from '@nestjs/common';
import { StoreUserController } from './storeUser/storeUser.controller';
import { StoreAdminController } from 'src/store/storeAdmin/storeAdmin.controller';
import { StoreDeveloperController } from './storeDeveloper/storeDeveloper.controller';

import { StoreUserService } from './storeUser/storeUser.service';
import { StoreDeveloperService } from './storeDeveloper/storeDeveloper.service';
import { StoreAdminService } from 'src/store/storeAdmin/storeAdmin.service';
import {
  STORE_ADMIN_REPOSITORY,
  STORE_DEVELOPER_REPOSITORY,
  STORE_USER_REPOSITORY,
} from 'src/constants/constants';

import { PrismaDeveloperRepository } from './storeDeveloper/store.PrismaDeveloperRepository';
import { PrismaUserRepository } from './storeUser/store.PrismaUserRepository';
import { PrismaAdminRepository } from 'src/store/storeAdmin/store.PrismaAdminRepository';

@Module({
  controllers: [
    StoreUserController,
    StoreDeveloperController,
    StoreAdminController,
  ],
  providers: [
    StoreUserService,
    StoreDeveloperService,
    StoreAdminService,
    {
      provide: STORE_USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: STORE_DEVELOPER_REPOSITORY,
      useClass: PrismaDeveloperRepository,
    },
    {
      provide: STORE_ADMIN_REPOSITORY,
      useClass: PrismaAdminRepository,
    },
  ],
})
export class StoreModule {}
