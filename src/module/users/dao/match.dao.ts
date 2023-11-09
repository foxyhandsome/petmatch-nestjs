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
            INNER JOIN skintype skt
            ON skt.id_skin = p.id_skin
            INNER JOIN bloodtype blt
            ON blt.id_blood = p.id_blood
            INNER JOIN user ur
            ON ur.id_user = p.id_user
            INNER JOIN petbreed pb
            ON pb.id_breed = p.id_breed
            WHERE p.id_user != ? AND pmi.id_userhome IS NULL OR pmi.id_userhome != ?;`;
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
