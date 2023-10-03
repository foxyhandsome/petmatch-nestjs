
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from 'src/entities/District';


@Injectable()
export class DistrictService {
  constructor(
    @InjectRepository(District) private DistrictRepository: Repository<District>, //รับจาก entities
  ) { }

  async getDistrict() {
    return this.DistrictRepository.find();
  }
}





