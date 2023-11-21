import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/Review';
import { Repository } from 'typeorm';


@Injectable()
export class ReviewDao {
    constructor(
        @InjectRepository(Review) //รับจาก entities
        private readonly userRepository: Repository<Review>,
    ) { }

    async findallReview(): Promise<ResReviewDto[]> { 
        try {
            const query = `
            SELECT * FROM review
            INNER JOIN user u1 ON review.id_user_home = u1.id_user
            INNER JOIN user u2 ON review.id_user_review = u2.id_user
            INNER JOIN pet p1 ON review.id_pet_home = p1.id_pet
            INNER JOIN pet p2 ON review.id_pet_review = p2.id_pet;`;
            const results = await this.userRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }

    async findReviewbyuserhomeid(id_user_home : number) { 
        try {
            const query = `
            SELECT * FROM review
            INNER JOIN user u1 ON review.id_user_home = u1.id_user
            INNER JOIN user u2 ON review.id_user_review = u2.id_user
            INNER JOIN pet p1 ON review.id_pet_home = p1.id_pet
            INNER JOIN pet p2 ON review.id_pet_review = p2.id_pet
            WHERE u1.id_user = 5;;`;
            const results = await this.userRepository.query(query, [id_user_home]);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }
}
