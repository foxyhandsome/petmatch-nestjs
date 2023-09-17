import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/Review';
import { Repository } from 'typeorm';


@Injectable()
export class PetDao {
    constructor(
        @InjectRepository(Review)
        private readonly userRepository: Repository<Review>,
    ) { }

    async findReviewWithUserTypes(): Promise<ResReviewDto[]> { // Update the return type
        try {
            const query = ` SELECT * FROM user INNER JOIN usertype ON user.type_id = usertype.id_type`;
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
