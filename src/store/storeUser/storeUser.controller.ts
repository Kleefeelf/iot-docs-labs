import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { userDto } from 'src/dto/user.dto';
import { StoreUserService } from './storeUser.service';

@Controller('store')
export class StoreUserController {
  constructor(private storeService: StoreUserService) {}

  @Post('users')
  async addUser(@Body() userDto: userDto) {
    return await this.storeService.createUser(userDto);
  }

  @Get('users')
  async getUsers() {
    return await this.storeService.getUsers();
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string) {
    return await this.storeService.getUserById(id);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() user: userDto) {
    return await this.storeService.updateUser(id, user);
  }

  @Delete('users:id')
  async deleteUser(@Param('id') id: string) {
    return await this.storeService.deleteUser(id);
  }

  @Get('users/csv/read-csv')
  async readCsv() {
    return this.storeService.readCsv();
  }
}
