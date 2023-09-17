import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { ReviewService } from '../services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) { }

  // @Get('/users-with-types')
  // async findUsersWithUserTypes() {
  //   return this.reviewService.findReviewWithUserTypes();
  // }


  @Get("/get-review")
  getUsers() {
    return this.reviewService.findReview();
  }

  @Post('/create-review')
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    try {
      const newReview = await this.reviewService.createReview(createReviewDto);
      return newReview;
    } catch (error) {
      throw new HttpException(
        'เกิดข้อผิดพลาดในการสร้างรีวิว.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/edit-review')
  async editReview(@Body() createReviewDto: CreateReviewDto) {
    try {
      const updatedReview = await this.reviewService.editReview(createReviewDto);
      return updatedReview;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete-review/:id')
  async deleteUser(@Param('id') reviewId: string) {
    try {
      const id = parseInt(reviewId, 10);
      const result = await this.reviewService.deleteReview(id);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
