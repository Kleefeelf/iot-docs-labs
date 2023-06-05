import { Inject, Injectable } from '@nestjs/common';
import { DEVELOPER_REPOSITORY } from 'src/constants/constants';
import { DeveloperRepository } from './developer.repository';
import { AppDto } from 'src/dto/app.dto';
import { StoreApp } from '@prisma/client';

@Injectable()
export class DeveloperService {
  constructor(
    @Inject(DEVELOPER_REPOSITORY)
    private readonly developerRepository: DeveloperRepository,
  ) {}

  async createApp(App: AppDto): Promise<StoreApp> {
    return await this.developerRepository.createApp(App);
  }

  async getApps() {
    return await this.developerRepository.getApps();
  }

  async getAppById(id: string) {
    return await this.developerRepository.getAppById(id);
  }

  async updateApp(id: string, App: AppDto) {
    return await this.developerRepository.updateApp(id, App);
  }

  async deleteApp(id: string) {
    return await this.developerRepository.deleteAppById(id);
  }

  async readCsv() {
    return await this.developerRepository.readCSV();
  }
}
