
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subdistrict } from 'src/entities/Subdistrict';
import { Repository } from 'typeorm';
import { SubdistrictDao } from '../dao/subdistrict.dao';


@Injectable()
export class SubDistrictService {
  constructor(
    private readonly subdistrictDao: SubdistrictDao , //ตัวเเปร userDao เเละรับค่าจาก UserDao
    @InjectRepository(Subdistrict) private SubDistrictRepository: Repository<Subdistrict>, //รับจาก entities
  ) {
  }

  async findSubDistrictbydistrictid(id_district: number): Promise<Subdistrict | null> {
    const resSubdistrict: ResSubDistrictDto = await this.subdistrictDao.findsubdistrictbydistrictid(id_district);
    return resSubdistrict;
  }


}





