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

    async findpetformatch(reqmatchDto: ReqMatchDto): Promise<ResPetMatchDto[]> {
        try {
            const query = ` 
            SELECT p.*,
			pmi1.id_match,
            pmi1.id_userhome,
            pmi1.id_pethome,
            pmi1.id_userguest,
            pmi1.id_petguest,
            pmi1.match_userguest,
            pmi1.match_userhome,
            pmi1.match_dislike,
            pmi2.id_match,
            pmi2.id_userhome,
            pmi2.id_pethome,
            pmi2.id_userguest,
            pmi2.id_petguest,
            pmi2.match_userguest,
            pmi2.match_userhome,
            pmi2.match_dislike,
            skt.*,
            blt.*,
            ur.*,
            pb.*
            FROM pet p
            LEFT JOIN petmatchinfo pmi1 ON p.id_pet = pmi1.id_pethome
            LEFT JOIN petmatchinfo pmi2 ON p.id_pet = pmi2.id_petguest
            INNER JOIN skintype skt ON skt.id_skin = p.id_skin
            INNER JOIN bloodtype blt ON blt.id_blood = p.id_blood
            INNER JOIN user ur ON ur.id_user = p.id_user
            INNER JOIN petbreed pb ON pb.id_breed = p.id_breed
            WHERE p.id_user != 18 AND (pmi1.id_userguest IS NULL OR pmi1.id_userguest != 18) AND (pmi2.id_userhome IS NULL OR pmi2.id_userhome != 18)  
            ORDER BY p.id_pet ASC;`;
            const results: ResPetMatchDto[] = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }
    
            return results;
        } catch (error) {
            throw new Error('${error.message}');
        }
    }
}
