
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewDao } from '../dao/review.dao';
import { Review } from 'src/entities/Review';
import { District } from 'src/entities/District';


@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District) private DistrictRepository: Repository<District>, //รับจาก entities
  ) { }

  async getDistrict() {
    try {
      const GetDistrict = await this.DistrictRepository.find; 

      if (!GetDistrict || GetDistrict.length === 0) { 
        throw new NotFoundException('ไม่พบผู้ใช้');
      }

      return GetDistrict;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลผู้ใช้: ${error.message} `);
    }
  }
}




  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }




