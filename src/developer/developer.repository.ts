import { StoreApp } from '@prisma/client';
import { AppDto } from 'src/dto/app.dto';

export interface DeveloperRepository {
  readCSV(): Promise<void>;
  createApp(App: AppDto): Promise<StoreApp>;
  getAppById(id: string): Promise<StoreApp | null>;
  getApps(): Promise<StoreApp[]>;
  updateApp(id: string, App: AppDto): Promise<StoreApp>;
  deleteAppById(id: string): Promise<void>;
}
