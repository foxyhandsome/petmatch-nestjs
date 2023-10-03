import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subdistrict } from 'src/entities/Subdistrict';
import { Repository } from 'typeorm';


@Injectable()
export class SubdistrictDao {
    constructor(
        @InjectRepository(Subdistrict)
        private readonly subdistrictRepository: Repository<Subdistrict>,
    ) { }

    async findsubdistrictbydistrictid(id_district:number): Promise<ResSubDistrictDto> {
        try {
            const query = ` 
            SELECT * FROM subdistrict
            INNER JOIN district ON district.id_district = subdistrict.id_district
            WHERE district.id_district = ? ;`;
            const results = await this.subdistrictRepository.query(query,[id_district]);
            if (!results || results.length === 0) {
                throw new NotFoundException('ไม่เจอข้อมูล');
            }
            return results;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }
}
