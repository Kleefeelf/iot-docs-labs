import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DeveloperModule } from './developer/developer.module';
import { AdminModule } from './admin/admin.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    DeveloperModule,
    AdminModule,
    StoreModule,
  ],
})
export class AppModule {}
