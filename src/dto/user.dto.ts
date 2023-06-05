import { ReviewDto } from './review.dto';

export interface userDto {
  id: number;
  username: string;
  email: string;
  password: string;

  reviews?: ReviewDto[];
  firstName?: string;
  lastName?: string;
}
