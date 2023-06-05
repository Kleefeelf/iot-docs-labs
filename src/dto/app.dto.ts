import { ReviewDto } from './review.dto';

export interface AppDto {
  id: number;
  name: string;
  category: string;
  description: string;
  developerId: number;
  rating: number;
  price: number;
  downloads: number;
  reviews?: ReviewDto[];
  isVerified: boolean;
}
