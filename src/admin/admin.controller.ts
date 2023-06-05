import { Body, Controller, Patch, Delete, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AppDto } from 'src/dto/app.dto';
import { StoreApp } from '@prisma/client';

//add guards
@Controller('store')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Patch('apps/:id')
  async verifyApp(
    @Param('id') id: string,
    @Body() app: AppDto,
  ): Promise<StoreApp> {
    return await this.adminService.verifyApp(id, app);
  }

  @Delete('apps/:id')
  async deleteAppById(@Param('id') id: string): Promise<void> {
    return await this.adminService.deleteAppById(id);
  }
}
