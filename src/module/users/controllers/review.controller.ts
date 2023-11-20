import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { ReviewService } from '../services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) { } //ตัวเเปร reviewService เเละรับค่าจาก ReviewService

  // @Get("/get-review")
  // getUsers() {
  //   return this.reviewService.findReview();
  // }

  @Get("/get-review") //เส้น api
  async getreview() { //getreview คือฟังชั่น
  try {
    const result = await this.reviewService.findReview(); //เรียกใช้ฟังชั่น findReview เเละส่งให้กับ result
    return result ;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  @Post('/create-review') //เส้น api
  async createReview(@Body() createReviewDto: CreateReviewDto) { //createReview คือฟังชั่น  โดยสร้างพารามิเตอร์ createReviewDto ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลของ CreateReviewDto
    try {
      const newReview = await this.reviewService.createReview(createReviewDto); //newReviewคือเเปร เเละมีการเรียกใช้ฟั่งชั่น createReview <-- ถูกส่งข้อมูลผู้ใช้ผ่าน createReviewDto 
      return newReview;
    } catch (error) {
      throw new HttpException(
        'เกิดข้อผิดพลาดในการสร้างรีวิว.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/edit-review') //เส้น api
  async editReview(@Body() createReviewDto: CreateReviewDto) { //editReview คือฟังชั่น  โดยสร้างพารามิเตอร์ createReviewDto ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลของ CreateReviewDto
    try {
      const updatedReview = await this.reviewService.editReview(createReviewDto); //updatedReview คือเเปร เเละมีการเรียกใช้ฟั่งชั่น editReview <-- ถูกส่งข้อมูลผู้ใช้ผ่าน createReviewDto
      return updatedReview;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete-review/:id') //เส้น api
  async deleteUser(@Param('id') reviewId: string) { //deleteUser คือฟังชั่น :id ไว้กำหนดไอดีรีวิว
    try {
      const id = parseInt(reviewId, 10); //เเปลง reviewId จาก String ไปเป็น Int
      const result = await this.reviewService.deleteReview(id); //result คือเเปร เเละมีการเรียกใช้ฟั่งชั่น deleteReview โดยส่งไอดีรีวิวเข้าไป
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
