
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewDao } from '../dao/review.dao';
import { Review } from 'src/entities/Review';


@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewDao: ReviewDao,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) { }

  findReview() {
    return this.reviewRepository.find();
  }

  async createReview(reviewDetails: CreateReviewDto) {
    try {
      const newReview = this.reviewRepository.create({
        ...reviewDetails,
      });
      return await this.reviewRepository.save(newReview);
    } catch (error) {
      throw new Error(error);
    }
  }

  async editReview(reviewDetails: CreateReviewDto) {
    try {
      const existingReview = await this.reviewRepository.findOneById(reviewDetails.id_review);
      console.log(existingReview);

      if (!existingReview) {
        throw new Error('หารีวิวไม่เจอ');
      }
      existingReview.review_info = reviewDetails.review_info;
      existingReview.star = reviewDetails.star;
      return await this.reviewRepository.save(existingReview);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteReview(reviewId: number) {
    try {
      // Find the user by ID
      const reviewToDelete = await this.reviewRepository.findOneById(reviewId);

      if (!reviewToDelete) {
        throw new Error('หาผู้ใช้ไม่เจอ');
      }
      // Delete the user
      await this.reviewRepository.remove(reviewToDelete);
      return `รีวิวไอดีที่: ${reviewId} ได้ถูกลบเรียบร้อยเเล้ว`;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการลบรีวิว: ${error.message}`);
    }
  }
}




  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }




