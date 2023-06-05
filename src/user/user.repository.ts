import { Review } from '@prisma/client';
import { ReviewDto } from 'src/dto/review.dto';

export interface UserRepository {
  readCSV(): Promise<void>;
  createReview(review: ReviewDto): Promise<Review>;
  getReviewById(id: string): Promise<Review | null>;
  getReviews(): Promise<Review[]>;
  updateReview(id: string, review: ReviewDto): Promise<Review>;
  deleteReviewById(id: string): Promise<void>;
}
