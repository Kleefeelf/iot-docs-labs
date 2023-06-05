import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StoreDeveloperService } from './storeDeveloper.service';
import { DeveloperDto } from 'src/dto/Developer.dto';

@Controller('store')
export class StoreDeveloperController {
  constructor(private storeService: StoreDeveloperService) {}

  @Post('developers')
  async addDeveloper(@Body() DeveloperDto: DeveloperDto) {
    return await this.storeService.createDeveloper(DeveloperDto);
  }

  @Get('developers')
  async getDevelopers() {
    return await this.storeService.getDevelopers();
  }

  @Get('developers/:id')
  async getDeveloperById(@Param('id') id: string) {
    return await this.storeService.getDeveloperById(id);
  }

  @Put('developers/:id')
  async updateDeveloper(
    @Param('id') id: string,
    @Body() Developer: DeveloperDto,
  ) {
    return await this.storeService.updateDeveloper(id, Developer);
  }

  @Delete('developers/:id')
  async deleteDeveloper(@Param('id') id: string) {
    return await this.storeService.deleteDeveloper(id);
  }

  @Get('developers/csv/read-csv')
  async readCsv() {
    return this.storeService.readCsv();
  }
}
