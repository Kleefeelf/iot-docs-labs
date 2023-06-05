import { Inject, Injectable } from '@nestjs/common';
import { StoreDeveloperRepository } from './storeDeveloper.repository';
import { STORE_DEVELOPER_REPOSITORY } from 'src/constants/constants';
import { DeveloperDto } from 'src/dto/developer.dto';
import { Developer } from '@prisma/client';

@Injectable()
export class StoreDeveloperService {
  constructor(
    @Inject(STORE_DEVELOPER_REPOSITORY)
    private readonly storeRepository: StoreDeveloperRepository,
  ) {}

  async createDeveloper(developer: DeveloperDto): Promise<Developer> {
    return await this.storeRepository.createDeveloper(developer);
  }

  async getDevelopers() {
    return await this.storeRepository.getDevelopers();
  }

  async getDeveloperById(id: string) {
    return await this.storeRepository.getDeveloperById(id);
  }

  async updateDeveloper(id: string, developer: DeveloperDto) {
    return await this.storeRepository.updateDeveloper(id, developer);
  }

  async deleteDeveloper(id: string) {
    return await this.storeRepository.deleteDeveloperById(id);
  }

  async readCsv() {
    return await this.storeRepository.readCSV();
  }
}
