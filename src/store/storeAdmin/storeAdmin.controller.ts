import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StoreAdminService } from './storeAdmin.service';
import { AdminDto } from 'src/dto/Admin.dto';

@Controller('store')
export class StoreAdminController {
  constructor(private storeService: StoreAdminService) {}

  @Post('admins')
  async addAdmin(@Body() AdminDto: AdminDto) {
    return await this.storeService.createAdmin(AdminDto);
  }

  @Get('admins')
  async getAdmins() {
    return await this.storeService.getAdmins();
  }

  @Get('admins/:id')
  async getAdminById(@Param('id') id: string) {
    return await this.storeService.getAdminById(id);
  }

  @Put('admins/:id')
  async updateAdmin(@Param('id') id: string, @Body() Admin: AdminDto) {
    return await this.storeService.updateAdmin(id, Admin);
  }

  @Delete('admins/:id')
  async deleteAdmin(@Param('id') id: string) {
    return await this.storeService.deleteAdmin(id);
  }

  @Get('admins/csv/read-csv')
  async readCsv() {
    return this.storeService.readCsv();
  }
}
