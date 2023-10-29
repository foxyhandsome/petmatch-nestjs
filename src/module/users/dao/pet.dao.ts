import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/entities/Review';
import { Repository } from 'typeorm';


@Injectable()
export class PetDao {
    constructor(
        @InjectRepository(Review)
        private readonly petRepository: Repository<Review>,
    ) { }

    async findPetwithallinfo(): Promise<ResReviewDto[]> { // Update the return type
        try {
            const query = ` 
            SELECT * FROM pet
            INNER JOIN skintype ON skintype.id_skin = pet.id_skin
            INNER JOIN bloodtype ON bloodtype.id_blood = pet.id_blood
            INNER JOIN user ON user.id_user = pet.id_user
            INNER JOIN petbreed ON petbreed.id_breed = pet.id_breed`;
            const results = await this.petRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }

    async findpetbyid(id_pet: number): Promise<ResPetDto> {
        try {
          const query = `
            SELECT * 
            FROM pet  
            WHERE pet.id_pet = ? `; 

          const results = await this.petRepository.query(query, [id_pet]); 

          if (!results || results.length === 0) {
            throw new NotFoundException('หาไอดีสัตว์เลี้ยงไม่เจอ');
          }

          return results;
        } catch (error) {
          throw new Error(`เกิดข้อผิดพลาดในการค้นหาไอดีสัตว์เลี้ยง: ${error.message}`);
        }
      }

      async findpetbyuserid(id_user: number): Promise<ResPetDto> {
        try {
          const query = `
            SELECT * FROM pet
            INNER JOIN skintype ON skintype.id_skin = pet.id_skin
            INNER JOIN bloodtype ON bloodtype.id_blood = pet.id_blood
            INNER JOIN user ON user.id_user = pet.id_user
            INNER JOIN petbreed ON petbreed.id_breed = pet.id_breed  
            WHERE pet.id_user = ? `; 

          const results = await this.petRepository.query(query, [id_user]); 

          if (!results || results.length === 0) {
            throw new NotFoundException('หาไอดีสัตว์เลี้ยงไม่เจอ');
          }

          return results;
        } catch (error) {
          throw new Error(`เกิดข้อผิดพลาดในการค้นหาไอดีสัตว์เลี้ยง: ${error.message}`);
        }
      }
}
