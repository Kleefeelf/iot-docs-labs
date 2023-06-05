import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReviewDto } from 'src/dto/review.dto';

@Controller('store/apps')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('reviews')
  async addReview(@Body() reviewDto: ReviewDto) {
    return await this.userService.addReview(reviewDto);
  }

  @Get('reviews')
  async getReviews() {
    return await this.userService.getReviews();
  }

  @Get('reviews/:id')
  async getReview(@Param('id') id: string) {
    return await this.userService.getReviewById(id);
  }

  @Put('reviews/:id')
  async updateReview(@Param('id') id: string, @Body() dto: ReviewDto) {
    return await this.userService.updateReview(id, dto);
  }

  @Delete('reviews/:id')
  async deleteReview(@Param('id') id: string) {
    return await this.userService.deleteReview(id);
  }

  @Get('reviews/csv/read-csv')
  async readCsv() {
    return this.userService.readCsv();
  }

  async downloadApp() {}
}
