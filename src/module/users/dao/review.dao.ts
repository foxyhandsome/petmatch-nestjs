import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/Review';
import { Repository } from 'typeorm';


@Injectable()
export class ReviewDao {
    constructor(
        @InjectRepository(Review) //รับจาก entities
        private readonly reviewRepository: Repository<Review>,
    ) { }

    async findallReview() { //ใช้ไม่ได้ ยิง php ได้สิ่งที่ต้องการ ยิง postman ไม่ได้สิ่งที่ต้องการ
        try {
            const query = `
            SELECT rv.id_review,rv.review_info,rv.star,
            uhome.*,
            ureview.*,
            phome.*,
            preview.*
            FROM review rv
            INNER JOIN user uhome ON uhome.id_user = rv.id_user_home 
            INNER JOIN user ureview ON ureview.id_user = rv.id_user_review 
            INNER JOIN pet phome ON phome.id_pet = rv.id_pet_home 
            INNER JOIN pet preview ON preview.id_pet = rv.id_pet_review;`;
            const results = await this.reviewRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }

    async findReviewbypethometid(id_pet_home : number) { 
        try {
            const query = `
            SELECT user.username , review.review_info FROM review
            INNER JOIN user ON review.id_user_review = user.id_user
            INNER JOIN pet ON review.id_pet_review = pet.id_pet
            WHERE id_pet_home = ?;`;
            const results = await this.reviewRepository.query(query,[id_pet_home]);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }

    async findReviewwebbypethometid(id_pet_home : number) { 
        try {
            const query = `
            SELECT * FROM review
            INNER JOIN user ON review.id_user_review = user.id_user
            INNER JOIN pet ON review.id_pet_review = pet.id_pet
            WHERE id_pet_home = ?;`;
            const results = await this.reviewRepository.query(query,[id_pet_home]);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }

    async findReviewbyid(id_review : number) { 
        try {
            const query = `
            SELECT * FROM review 
            WHERE id_review = ?;`;
            const results = await this.reviewRepository.query(query, [id_review]);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }
}
