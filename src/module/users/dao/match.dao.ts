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
            var query = ` 
            SELECT p.*,
            pmi1.id_match,
            pmi1.id_userhome,
            pmi1.id_pethome,
            pmi1.id_userguest,
            pmi1.id_petguest,
            pmi1.create_date,
            pmi1.update_date,
            pmi2.id_match,
            pmi2.id_userhome,
            pmi2.id_pethome,
            pmi2.id_userguest,
            pmi2.id_petguest,
            pmi2.create_date,
            pmi2.update_date,
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
            AND p.sex_pet != ? `;

            var results: ResPetMatchDto[];
            //เงื่อนไขเลือกหนึงอย่าง
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed == null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood == null && reqmatchDto.id_district == null){
                query = query.concat("AND p.age_pet <= ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet]);
            }
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed != null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood == null && reqmatchDto.id_district == null){
                query = query.concat("AND p.id_breed = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_breed]);
            }
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed == null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood == null && reqmatchDto.id_district == null){
                query = query.concat("AND p.id_skin = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_skin]);
            }
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed == null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood != null && reqmatchDto.id_district == null){
                query = query.concat("AND p.id_blood = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_blood]);
            }
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed == null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood == null && reqmatchDto.id_district != null){
                query = query.concat("AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_district]);
            }

            //เงื่อนไขเลือกสองอย่าง
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed != null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood == null && reqmatchDto.id_district == null){
                query = query.concat("AND p.age_pet <= ? AND p.id_breed = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet , reqmatchDto.id_breed]);
            }
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed == null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood == null && reqmatchDto.id_district == null){
                query = query.concat("AND p.age_pet <= ? AND p.id_skin = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet ,reqmatchDto.id_skin ]);
            }
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed == null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood != null && reqmatchDto.id_district == null){
                query = query.concat("AND p.age_pet <= ? AND p.id_blood = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet ,reqmatchDto.id_blood]);
            }
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed == null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood == null && reqmatchDto.id_district != null){
                query = query.concat("AND p.age_pet <= ? AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet ,reqmatchDto.id_district]);
            }


            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed != null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood == null && reqmatchDto.id_district == null){
                query = query.concat("AND p.id_breed = ? AND p.id_skin = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_breed ,reqmatchDto.id_skin]);
            }
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed != null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood != null && reqmatchDto.id_district == null){
                query = query.concat("AND p.id_breed = ? AND p.id_blood = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_breed ,reqmatchDto.id_blood]);
            }
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed != null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood == null && reqmatchDto.id_district != null){
                query = query.concat("AND p.id_breed = ? AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_breed ,reqmatchDto.id_district]);
            }


            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed == null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood != null && reqmatchDto.id_district == null){
                query = query.concat("AND p.id_skin = ? AND p.id_blood = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_skin ,reqmatchDto.id_blood]);
            }
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed == null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood == null && reqmatchDto.id_district != null){
                query = query.concat("AND p.id_skin = ? AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_skin ,reqmatchDto.id_district]);
            }

            //เงื่อนไขเลือกสามอย่าง
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed != null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood == null && reqmatchDto.id_district == null){
                query = query.concat("AND p.age_pet <= ? AND p.id_breed = ? AND p.id_skin = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet , reqmatchDto.id_breed ,reqmatchDto.id_skin]);
            }
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed != null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood != null && reqmatchDto.id_district == null){
                query = query.concat("AND p.age_pet <= ? AND p.id_breed = ? AND p.id_blood = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet , reqmatchDto.id_breed ,reqmatchDto.id_blood]);
            }
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed != null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood == null && reqmatchDto.id_district != null){
                query = query.concat("AND p.age_pet <= ? AND p.id_breed = ? AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet , reqmatchDto.id_breed ,reqmatchDto.id_district]);
            }
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed == null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood == null && reqmatchDto.id_district != null){
                query = query.concat("AND p.age_pet <= ? AND p.id_skin = ? AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet , reqmatchDto.id_skin ,reqmatchDto.id_district]);
            }
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed == null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood != null && reqmatchDto.id_district == null){
                query = query.concat("AND p.age_pet <= ? AND p.id_skin = ? AND p.id_blood = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet ,reqmatchDto.id_skin ,reqmatchDto.id_blood]);
            }
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed == null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood == null && reqmatchDto.id_district != null){
                query = query.concat("AND p.age_pet <= ? AND p.id_skin = ? AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.age_pet ,reqmatchDto.id_skin ,reqmatchDto.id_district]);
            }


            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed != null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood != null && reqmatchDto.id_district == null){
                query = query.concat("AND p.id_breed = ? AND p.id_skin = ? AND p.id_blood = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_breed ,reqmatchDto.id_skin ,reqmatchDto.id_blood]);
            }
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed != null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood == null && reqmatchDto.id_district != null){
                query = query.concat("AND p.id_breed = ? AND p.id_skin = ? AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_breed ,reqmatchDto.id_skin ,reqmatchDto.id_district]);
            }
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed != null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood != null && reqmatchDto.id_district != null){
                query = query.concat("AND p.id_breed = ? AND p.id_blood = ? AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_breed ,reqmatchDto.id_blood,reqmatchDto.id_district]);
            }

            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed == null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood != null && reqmatchDto.id_district != null){
                query = query.concat("AND p.id_skin = ? AND p.id_blood = ? AND ur.id_district = ?");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet 
                    ,reqmatchDto.id_skin ,reqmatchDto.id_blood,reqmatchDto.id_district]);
            }


            //เงื่อนไขเลือกสี่อย่าง
            if(reqmatchDto.age_pet != null && reqmatchDto.id_breed != null && reqmatchDto.id_skin != null  && reqmatchDto.id_blood != null && reqmatchDto.id_district != null){
                query = query.concat("AND p.age_pet <= ? AND p.id_breed = ? AND p.id_skin = ? AND p.id_blood = ? AND ur.id_district = ? ");
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet , reqmatchDto.age_pet , reqmatchDto.id_breed ,reqmatchDto.id_skin ,reqmatchDto.id_blood]);
            }
            
            //เงื่อนไขสี่อย่างเเต่เเบบไม่เลือกอะไรเลย
            if(reqmatchDto.age_pet == null && reqmatchDto.id_breed == null && reqmatchDto.id_skin == null  && reqmatchDto.id_blood == null && reqmatchDto.id_district == null){
                results = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet]);
            }

            // const results: ResPetMatchDto[] = await this.petRepository.query(query, [reqmatchDto.id_user, reqmatchDto.id_userhome, reqmatchDto.id_userguest, reqmatchDto.id_userhome, reqmatchDto.id_userguest , reqmatchDto.sex_pet]);

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
			END AS match_userhome,
            CASE 
				WHEN pmi.match_dislike IS NOT NULL AND pmi.match_dislike = 1 THEN true
				ELSE false
			END AS match_dislike,
            pguest.*,
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
			END AS match_userhome,
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

    async updateMatch(reqmatchDto: ReqPetMatchInfoDto) { //ส่งข้อเสนอการจับคู่
        try {
            const query = ` 
            UPDATE petmatchinfo pmi
            SET pmi.match_userguest = ?, pmi.match_userguest_deny = ?
            WHERE pmi.id_match = ?`;
            const results: ResPetMatchDto[] = await this.petRepository.query(query, [reqmatchDto.match_userguest, reqmatchDto.match_userguest_deny, reqmatchDto.id_match]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }

            return results;
        } catch (error) {
            throw new Error('${error.message}');
        }
    }

    async petmaybereview(reqmatchDto: ReqPetMatchInfoDto) { //ส่งข้อเสนอการจับคู่
        try {
            const query = ` 
            SELECT  pmi.id_match,
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
			END AS match_userhome,
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
            WHERE pmi.match_userhome = 1 AND pmi.match_userguest = 1 AND pmi.match_userguest_deny = 0 AND pmi.match_dislike = 0 AND pmi.id_userhome = ?;`;
            const results: ResPetMatchDto[] = await this.petRepository.query(query, [reqmatchDto.id_userhome]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }

            return results;
        } catch (error) {
            throw new Error('${error.message}');
        }
    }

    async petmatchhistory(reqmatchDto: ReqPetMatchInfoDto) { //ส่งข้อเสนอการจับคู่
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
			END AS match_userhome,
            CASE 
				WHEN pmi.match_dislike IS NOT NULL AND pmi.match_dislike = 1 THEN true
				ELSE false
			END AS match_dislike,
            pmi.create_date,
            pmi.update_date,
            pguest.id_pet AS id_pet_guest,
            pguest.picture_pet AS picture_pet_guest,
            pguest.sex_pet AS sex_pet_guest,
            pguest.health_pet AS health_pet_guest,
            pguest.name_pet AS name_pet_guest,
            pguest.age_pet AS age_pet_guest,
            pguest.id_skin AS id_skin_guest,
            pguest.id_blood AS id_blood_guest,
            pguest.id_user AS id_user_guest,
            pguest.id_breed AS id_breed_guest,
            sktguest.id_skin AS id_skin_guest,
            sktguest.type_skin AS type_skin_guest,
            bltguest.id_blood AS id_blood_guest,
            bltguest.type_blood AS type_blood_guest,
            pbguest.id_breed AS id_breed_guest,
            pbguest.name_breed AS name_breed_guest,
            urguest.id_user AS id_user_guest,
            urguest.username AS username_guest,
            urguest.password AS password_guest,
            urguest.information AS information_guest,
            urguest.contact AS contact_guest,
            urguest.id_district AS id_district_guest,
            urguest.id_subdistrict AS id_subdistrict_guest,
            urguest.id_typeuser AS id_typeuser_guest,
            dtguest.id_district AS id_district_guest,
            dtguest.name_district AS name_district_guest,
            dtguest.province_name AS province_name_guest,
            sdtguest.id_subdistrict AS id_subdistrict_guest,
            sdtguest.name_subdistrict AS name_subdistrict_guest,
            sdtguest.id_district AS id_district_guest,
            
            phome.id_pet AS id_pet_home,
            phome.picture_pet AS picture_pet_home,
            phome.sex_pet AS sex_pet_home,
            phome.health_pet AS health_pet_home,
            phome.name_pet AS name_pet_home,
            phome.age_pet AS age_pet_home,
            phome.id_skin AS id_skin_home,
            phome.id_blood AS id_blood_home,
            phome.id_user AS id_user_home,
            phome.id_breed AS id_breed_home,
            skthome.id_skin AS id_skin_home,
            skthome.type_skin AS type_skin_home,
            blthome.id_blood AS id_blood_home,
            blthome.type_blood AS type_blood_home,
            pbhome.id_breed AS id_breed_home,
            pbhome.name_breed AS name_breed_home,
            urhome.id_user AS id_user_home,
            urhome.username AS username_home,
            urhome.password AS password_home,
            urhome.information AS information_home,
            urhome.contact AS contact_home,
            urhome.id_district AS id_district_home,
            urhome.id_subdistrict AS id_subdistrict_home,
            urhome.id_typeuser AS id_typeuser_home,
            dthome.id_district AS id_district_home,
            dthome.name_district AS name_district_home,
            dthome.province_name AS province_name_home,
            sdthome.id_subdistrict AS id_subdistrict_home,
            sdthome.name_subdistrict AS name_subdistrict_home,
            sdthome.id_district AS id_district_home
            FROM petmatchinfo pmi
            INNER JOIN pet pguest ON pguest.id_pet = pmi.id_petguest
            INNER JOIN pet phome ON phome.id_pet = pmi.id_pethome
            INNER JOIN skintype sktguest ON sktguest.id_skin = pguest.id_skin
            INNER JOIN bloodtype bltguest ON bltguest.id_blood = pguest.id_blood
            INNER JOIN petbreed pbguest ON pbguest.id_breed = pguest.id_breed
            INNER JOIN user urguest ON urguest.id_user = pmi.id_userguest
            INNER JOIN district dtguest ON dtguest.id_district = urguest.id_district
            INNER JOIN subdistrict sdtguest ON sdtguest.id_subdistrict = urguest.id_subdistrict
            INNER JOIN skintype skthome ON skthome.id_skin = phome.id_skin
            INNER JOIN bloodtype blthome ON blthome.id_blood = phome.id_blood
            INNER JOIN petbreed pbhome ON pbhome.id_breed = phome.id_breed
            INNER JOIN user urhome ON urhome.id_user = pmi.id_userhome
            INNER JOIN district dthome ON dthome.id_district = urhome.id_district
            INNER JOIN subdistrict sdthome ON sdthome.id_subdistrict = urhome.id_subdistrict
            WHERE pmi.match_userhome = 1 AND pmi.match_userguest = 1 AND (pmi.id_userhome = ? OR pmi.id_userguest = ?);`;
            const results: ResPetMatchDto[] = await this.petRepository.query(query, [reqmatchDto.id_userhome , reqmatchDto.id_userguest]);

            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }

            return results;
        } catch (error) {
            throw new Error('${error.message}');
        }
    }

}
