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

    async findpetformatch(reqmatchDto: ReqMatchDto): Promise<ResPetMatchDto[]> { //หาสัตว์เลี้ยงเพื่อจับคู่
        try {
            const query = ` 
            SELECT p.*,
 			pmi1.id_match,
    		pmi1.id_userhome,
    		pmi1.id_pethome,
    		pmi1.id_userguest,
    		pmi1.id_petguest,
    		pmi2.id_match,
    		pmi2.id_userhome,
    		pmi2.id_pethome,
    		pmi2.id_userguest,
    		pmi2.id_petguest,
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
            WHERE p.id_user != ?
	        AND (pmi1.id_userguest IS NULL OR pmi1.id_userguest != ?) 
            AND (pmi2.id_userhome IS NULL OR pmi2.id_userhome != ?) 
            AND p.id_pet NOT IN (SELECT id_pethome FROM petmatchinfo WHERE id_userguest = ?)
            AND p.id_pet NOT IN (SELECT id_petguest FROM petmatchinfo WHERE id_userhome = ?)
            ORDER BY p.id_pet ASC;`;
            const results: ResPetMatchDto[] = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome , reqmatchDto.id_userguest , reqmatchDto.id_userhome , reqmatchDto.id_userguest]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }
    
            return results;
        } catch (error) {
            throw new Error('${error.message}');
        }
    }
    
    async findpetlike(reqmatchDto: ReqMatchDto): Promise<ResPetMatchDto[]> { //ประวัติการจับคู่
        try {
            const query = ` 
            SELECT pmi.id_match,
			pmi.id_userhome,
            pmi.id_pethome,
            pmi.id_userguest,
            pmi.id_petguest,
            CASE 
				WHEN pmi.match_userguest IS NOT NULL AND pmi.match_userguest = 1 THEN true
				ELSE false
			END AS match_userguest,
            CASE 
				WHEN pmi.match_userguest_deny IS NOT NULL AND pmi.match_userguest_deny = 1 THEN true
				ELSE false
			END AS match_userguest_deny,
            CASE 
				WHEN pmi.match_userhome IS NOT NULL AND pmi.match_userhome = 1 THEN true
				ELSE false
			END AS match_userguest,
            CASE 
				WHEN pmi.match_dislike IS NOT NULL AND pmi.match_dislike = 1 THEN true
				ELSE false
			END AS match_dislike,
            pguest.*,
            phome.*,
            skt.*,
            blt.*,
            pb.*,
            ur.*,
            dt.*,
            sdt.*
            FROM petmatchinfo pmi
            INNER JOIN pet pguest ON pguest.id_pet = pmi.id_petguest
            INNER JOIN pet phome ON phome.id_pet = pmi.id_pethome
            INNER JOIN skintype skt ON skt.id_skin = pguest.id_skin
            INNER JOIN bloodtype blt ON blt.id_blood = pguest.id_blood
            INNER JOIN petbreed pb ON pb.id_breed = pguest.id_breed
            INNER JOIN user ur ON ur.id_user = pmi.id_userguest
            INNER JOIN district dt ON dt.id_district = ur.id_district
            INNER JOIN subdistrict sdt ON sdt.id_subdistrict = ur.id_subdistrict
            WHERE pmi.match_userhome = 1 AND pmi.id_userhome = ?;`;
            const results: ResPetMatchDto[] = await this.petRepository.query(query, [reqmatchDto.id_userhome]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }
    
            return results;
        } catch (error) {
            throw new Error('${error.message}');
        }
    }

    async petmatchticket(reqmatchDto: ReqMatchDto): Promise<ResPetMatchDto[]> { //ส่งข้อเสนอการจับคู่
        try {
            const query = ` 
            SELECT pmi.id_match,
			pmi.id_userhome,
            pmi.id_pethome,
            pmi.id_userguest,
            pmi.id_petguest,
            CASE 
				WHEN pmi.match_userguest IS NOT NULL AND pmi.match_userguest = 1 THEN true
				ELSE false
			END AS match_userguest,
            CASE 
				WHEN pmi.match_userguest_deny IS NOT NULL AND pmi.match_userguest_deny = 1 THEN true
				ELSE false
			END AS match_userguest_deny,
            CASE 
				WHEN pmi.match_userhome IS NOT NULL AND pmi.match_userhome = 1 THEN true
				ELSE false
			END AS match_userguest,
            CASE 
				WHEN pmi.match_dislike IS NOT NULL AND pmi.match_dislike = 1 THEN true
				ELSE false
			END AS match_dislike,
            pguest.*,
            phome.*,
            skt.*,
            blt.*,
            pb.*,
            ur.*,
            dt.*,
            sdt.*
            FROM petmatchinfo pmi
            INNER JOIN pet pguest ON pguest.id_pet = pmi.id_petguest
            INNER JOIN pet phome ON phome.id_pet = pmi.id_pethome
            INNER JOIN skintype skt ON skt.id_skin = pguest.id_skin
            INNER JOIN bloodtype blt ON blt.id_blood = pguest.id_blood
            INNER JOIN petbreed pb ON pb.id_breed = pguest.id_breed
            INNER JOIN user ur ON ur.id_user = pmi.id_userguest
            INNER JOIN district dt ON dt.id_district = ur.id_district
            INNER JOIN subdistrict sdt ON sdt.id_subdistrict = ur.id_subdistrict
            WHERE pmi.match_userhome = 1 AND pmi.match_userguest = 0 AND pmi.match_userguest_deny = 0 AND pmi.id_userguest = ?;`;
            const results: ResPetMatchDto[] = await this.petRepository.query(query, [reqmatchDto.id_userguest]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }
    
            return results;
        } catch (error) {
            throw new Error('${error.message}');
        }
    }
}
