import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { ReviewService } from '../services/review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) { } //ตัวเเปร reviewService เเละรับค่าจาก ReviewService

  // @Get("/get-review")
  // getUsers() {
  //   return this.reviewService.findReview();
  // }

  @Get("/get-all-review") //เส้นดึงรีวิวทั้งหมด
  async getreview() { //getreview คือฟังชั่น
    try {
      const result = await this.reviewService.findAllReview(); //เรียกใช้ฟังชั่น findReview เเละส่งให้กับ result
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/get-review-byid/:id_review') //เส้นดึงรีวิวโดยใช้ไอดีรีวิว
  async findReviewById(@Param('id_review') id_review: number) {
    const result = await this.reviewService.findReviewbyId(id_review);
    if (!result) {
      throw new NotFoundException('หาผู้ใช้ไม่เจอ');
    }
    return result;
  }

  @Get('/get-review/:id_pet_home') //เส้นดึงรีวิวโดยใช้ไอดีสัตว์เลี้ยงที่โดนรีวิว
  async findreviewbyPetHomeId(@Param('id_pet_home') id_pet_home: number) {
    const result = await this.reviewService.findReviewbypethomeId(id_pet_home);
    if (!result) {
      throw new NotFoundException('หาสัตว์เลี้ยงไม่เจอ');
    }
    return result;
  }


  @Post('/create-review') //เส้นสร้างรีวิว
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

  @Post('/edit-review/:id') //เส้นเเก้ไขรีวิว
  async editReview(@Param('id') id_review:number,@Body() createReviewDto: CreateReviewDto) { //editReview คือฟังชั่น  โดยสร้างพารามิเตอร์ createReviewDto ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลของ CreateReviewDto
    try {
      const updatedReview = await this.reviewService.editReview(id_review,createReviewDto); //updatedReview คือเเปร เเละมีการเรียกใช้ฟั่งชั่น editReview <-- ถูกส่งข้อมูลผู้ใช้ผ่าน createReviewDto
      return updatedReview;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete-review/:id') //เส้นลบรีวิว
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
