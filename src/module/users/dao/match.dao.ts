import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/entities/Pet';
import { Petmatchinfo } from 'src/entities/Petmatchinfo';
import { Subdistrict } from 'src/entities/Subdistrict';
import { Repository } from 'typeorm';


@Injectable()
export class MatchDao {
    constructor(
        @InjectRepository(Pet)
        private readonly petRepository: Repository<Pet>,
    ) { }

    async findpetformatch(reqmatchDto: ReqMatchDto): Promise<ResPetMatchDto> {
        try {
            const query = ` 
            SELECT *
            FROM pet p
            LEFT JOIN petmatchinfo pmi
            ON p.id_pet = pmi.id_petguest
            WHERE p.id_user != ? AND pmi.id_userhome IS NULL OR pmi.id_userhome != ? ;`;
            const results = await this.petRepository.query(query, [reqmatchDto.id_user , reqmatchDto.id_userhome]);
            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }
            return results;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }
}
