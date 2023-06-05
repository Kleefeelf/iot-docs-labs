import { Injectable } from '@nestjs/common';
import { Review, StoreApp, User } from '@prisma/client';
import { ReviewDto } from 'src/dto/review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class PrismaUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async readCSV() {
    try {
      const stream = fs
        .createReadStream('./src/csv/reviews.csv')
        .pipe(csvParser({ headers: true }));
      let headerSkipped = false;
      for await (const row of stream) {
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }

        const review: Review = {
          id: row['_0'],
          appId: parseInt(row['_1']),
          userId: parseInt(row['_2']),
          rating: parseInt(row['_3']),
          text: row['_4'],
        };
        const app = await this.prisma.storeApp.findUnique({
          where: { id: review.appId },
        });

        const user = await this.prisma.user.findUnique({
          where: { id: review.userId },
        });

        const reviewDto: ReviewDto = {
          id: review.id,
          app: app,
          user: user,
          rating: review.rating,
          text: review.text,
        };
        await this.createReview(reviewDto);
      }
    } catch (err) {
      throw new Error(
        `An error occurred while reading CSV file: ${err.message}`,
      );
    }
  }

  async createReview(review: ReviewDto): Promise<Review> {
    const { text, rating, user, app } = review;
    console.log(review);
    const userExists = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!userExists) {
      throw new Error(`User with id ${user.id} not found`);
    }

    const appExists = await this.prisma.storeApp.findUnique({
      where: { id: app.id },
    });

    if (!appExists) {
      throw new Error(`App with id ${app.id} not found`);
    }

    const createdReview = await this.prisma.review.create({
      data: {
        text,
        rating,
        user: { connect: { id: user.id } },
        app: { connect: { id: app.id } },
      },
      include: {
        user: true,
        app: true,
      },
    });
    return createdReview;
  }

  async getReviews(): Promise<Review[]> {
    return await this.prisma.review.findMany();
  }

  async getReviewById(id: string): Promise<Review | null> {
    return await this.prisma.review.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async updateReview(id: string, review: ReviewDto): Promise<Review> {
    const existingReview = await this.prisma.review.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, app: true },
    });
    if (!existingReview) {
      throw new Error(`Review with id ${id} not found`);
    }

    const updatedReview = { ...existingReview };
    updatedReview.rating = review.rating;
    updatedReview.text = review.text;

    const savedReview = await this.prisma.review.update({
      where: { id: existingReview.id },
      data: { rating: review.rating, text: review.text },
      include: { user: true, app: true },
    });
    return savedReview;
  }

  async deleteReviewById(id: string): Promise<void> {
    await this.prisma.review.delete({
      where: { id: parseInt(id) },
    });
  }
}
