import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/Review';
import { Repository } from 'typeorm';


@Injectable()
export class ReviewDao {
    constructor(
        @InjectRepository(Review)
        private readonly userRepository: Repository<Review>,
    ) { }

    async findReviewWithUsername(): Promise<ResReviewDto[]> { 
        try {
            const query = `
            SELECT * FROM review
            INNER JOIN user ON review.id_user = user.id_user
            INNER JOIN pet ON review.id_pet = pet.id_pet;`;
            const results = await this.userRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }
}
