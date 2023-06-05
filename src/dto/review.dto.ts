import { StoreApp, User } from '@prisma/client';

export interface ReviewDto {
  id: number;
  text: string;
  rating: number;
  user: User;
  app: StoreApp;
}
