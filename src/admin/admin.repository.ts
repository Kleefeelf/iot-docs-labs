import { StoreApp } from '@prisma/client';
import { AppDto } from 'src/dto/app.dto';

export interface AdminRepository {
  verifyApp(id: string, app: AppDto): Promise<StoreApp>;
  deleteAppById(id: string): Promise<void>;
}
