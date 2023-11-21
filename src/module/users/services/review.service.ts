
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewDao } from '../dao/review.dao';
import { Review } from 'src/entities/Review';


@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewDao: ReviewDao, //ตัวเเปร reviewDao เเละรับค่าจาก ReviewDao
    @InjectRepository(Review) private reviewRepository: Repository<Review>, //รับจาก entities
  ) { }

  // findReview() {
  //   return this.reviewRepository.find();
  // }

  async findAllReview() { //ไว้หาข้อมูลรีวิว //findReview คือฟังชั่น 
    try {
      const reviewtoFind = await this.reviewDao.findallReview(); //หาข้อมูลรีวิวเเละเรียก querry จาก reviewDao มาใช้
  
      if (!reviewtoFind || reviewtoFind.length === 0) { //หาไม่เจอเเละไม่มีค่า
        throw new NotFoundException('ไม่พบผู้ใช้');
      }

      return reviewtoFind;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลผู้ใช้: ${error.message}`);
    }
  }

  async findReviewbyUserHomeId(id_user_home: number) {
    const resReview = await this.reviewDao.findReviewbyuserhomeid(id_user_home);
    return resReview;
  }

  async createReview(reviewDetails: CreateReviewDto) { //ไว้สร้างข้อมูลรีวิว //createReview คือฟังชั่น โดยสร้างพารามิเตอร์ reviewDetails ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลจาก CreateReviewDto
    try {
      const newReview = this.reviewRepository.create({ //ไว้เก็บข้อมูลรีวิวไว้ในตัวเเปร newReview จากการเก็บค่าข้อมูล reviewDetails ที่มากจาก CreateUserDto อีกที
        ...reviewDetails,
      });
      return await this.reviewRepository.save(newReview); //บันทึกข้อมูลลงข้อมูลใน db
    } catch (error) {
      throw new Error(error);
    }
  }

  async editReview(reviewDetails: CreateReviewDto) { //ไว้เเก้ไขข้อมูลผู้ใช้ //editReview คือฟังชั่น โดยสร้างพารามิเตอร์ reviewDetails ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลของ CreateReviewDto
    try {
      const edtReview = await this.reviewRepository.findOneById(reviewDetails.id_review); //ไว้เก็บข้อมูลไอดีรีวิวไว้ในตัวเเปร existingUser
      console.log(edtReview);

      if (!edtReview) {
        throw new Error('หารีวิวไม่เจอ');
      }
      edtReview.review_info = reviewDetails.review_info;
      edtReview.star = reviewDetails.star;
      return await this.reviewRepository.save(edtReview); // อัปเดตข้อมูลผู้ใช้จาก reviewDetails ที่รับข้อมูลมาจากโครงสร้างข้อมูล CreateReviewDto ที่รับเข้ามาเมื่อเจอผู้ใช้ต้องการเเก้ไข
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteReview(reviewId: number) { //ไว้ลบข้อมูลผู้ใช้ //deleteReview คือฟังชั่น โดยสร้างพารามิเตอร์ reviewId ที่เป็นตัวเลข
    try {
      const reviewToDelete = await this.reviewRepository.findOneById(reviewId); // ไว้ตรวจไอดีรีวิวเเละเก็บ

      if (!reviewToDelete) {
        throw new Error('หาผู้ใช้ไม่เจอ');
      }
      await this.reviewRepository.remove(reviewToDelete); // ลบข้อมูลรีวิวมื่อมีค่าตรงกับ db
      return `รีวิวไอดีที่: ${reviewId} ได้ถูกลบเรียบร้อยเเล้ว`;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการลบรีวิว: ${error.message}`);
    }
  }
}




  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }




