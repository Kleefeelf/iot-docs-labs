import { Developer } from '@prisma/client';
import { DeveloperDto } from 'src/dto/developer.dto';

export interface StoreDeveloperRepository {
  readCSV(): Promise<void>;
  createDeveloper(developer: DeveloperDto): Promise<Developer>;
  getDeveloperById(id: string): Promise<Developer>;
  getDevelopers(): Promise<Developer[]>;
  updateDeveloper(id: string, developer: DeveloperDto): Promise<Developer>;
  deleteDeveloperById(id: string): Promise<void>;
}
