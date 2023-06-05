import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { AppDto } from 'src/dto/app.dto';

@Controller('store')
export class DeveloperController {
  constructor(private developerService: DeveloperService) {}

  @Post('apps')
  async addApp(@Body() appDto: AppDto) {
    return await this.developerService.createApp(appDto);
  }

  @Get('apps')
  async getApps() {
    return await this.developerService.getApps();
  }

  @Get('apps/:id')
  async getAppById(@Param('id') id: string) {
    return await this.developerService.getAppById(id);
  }

  @Put('apps/:id')
  async updateApp(@Param('id') id: string, @Body() app: AppDto) {
    return await this.developerService.updateApp(id, app);
  }

  @Delete('apps/:id')
  async deleteApp(@Param('id') id: string) {
    return await this.developerService.deleteApp(id);
  }

  @Get('apps/csv/read-csv')
  async readCsv() {
    return this.developerService.readCsv();
  }
}
