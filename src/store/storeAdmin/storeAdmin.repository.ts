import { Admin } from '@prisma/client';
import { AdminDto } from 'src/dto';

export interface StoreAdminRepository {
  readCSV(): Promise<void>;
  createAdmin(admin: AdminDto): Promise<Admin>;
  getAdminById(id: string): Promise<Admin>;
  getAdmins(): Promise<Admin[]>;
  updateAdmin(id: string, admin: AdminDto): Promise<Admin>;
  deleteAdminById(id: string): Promise<void>;
}
