import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Petmatchinfo } from 'src/entities/Petmatchinfo';
import { Subdistrict } from 'src/entities/Subdistrict';
import { Repository } from 'typeorm';


@Injectable()
export class MatchDao {
    constructor(
        @InjectRepository(Petmatchinfo)
        private readonly petmatchinfoRepository: Repository<Petmatchinfo>,
    ) { }

    async findpetwithoutuserhome(reqmatchDto: ReqMatchDto): Promise<ResMatchDto> {
        try {
            const query = ` 
            SELECT * 
            FROM pet 
            WHERE id_user != ? and username = ? ;`;
            const results = await this.petmatchinfoRepository.query(query, [reqmatchDto.id_user, reqmatchDto.username]);
            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }
            return results;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }
}
