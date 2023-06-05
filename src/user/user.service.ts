import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/constants/constants';
import { ReviewDto } from 'src/dto/review.dto';
import { UserRepository } from './user.repository';
import { Review } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async addReview(review: ReviewDto): Promise<Review> {
    return await this.userRepository.createReview(review);
  }

  async getReviews() {
    return await this.userRepository.getReviews();
  }

  async getReviewById(id: string) {
    return await this.userRepository.getReviewById(id);
  }

  async updateReview(id: string, review: ReviewDto) {
    return await this.userRepository.updateReview(id, review);
  }

  async deleteReview(id: string) {
    return await this.userRepository.deleteReviewById(id);
  }

  async readCsv() {
    return await this.userRepository.readCSV();
  }

  async downloadApp() {}
}
