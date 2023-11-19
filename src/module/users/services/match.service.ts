
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from 'src/entities/Pet';
import { MatchDao } from '../dao/match.dao';
import { Petmatchinfo } from 'src/entities/Petmatchinfo';


@Injectable()
export class MatchService {
  constructor(
    private readonly matchDao: MatchDao,
    @InjectRepository(Petmatchinfo) private petmatchinfoRepository: Repository<Petmatchinfo>,
  ) { }

  async getPetforMatch(reqmatchDto: ReqMatchDto) {
    return this.matchDao.findpetformatch(reqmatchDto)  //เส้นดึงสัตว์เลี้ยงมาจับคู่ //ไม่ได้เชื่อมกับ service เชื่อมกับ dao เลย
  }

  async getPetlike(reqmatchDto: ReqMatchDto) {
    return this.matchDao.findpetlike(reqmatchDto)  //เส้นดึงสัตว์เลี้ยงมาจับคู่ //ไม่ได้เชื่อมกับ service เชื่อมกับ dao เลย
  }

  async PetmatchTicket(reqmatchDto: ReqMatchDto) {
    return this.matchDao.petmatchticket(reqmatchDto)  //เส้นดึงสัตว์เลี้ยงมาจับคู่ //ไม่ได้เชื่อมกับ service เชื่อมกับ dao เลย
  }

  async createpetMatchInfo(petmatchInfoDetail: ReqPetMatchInfoDto) { //เส้นสร้างประวัติการจับคู่ หรือ จับคู่ //เส้นนี้พัง
    try {
      const newPetMatchInfo = this.petmatchinfoRepository.create({
        ...petmatchInfoDetail,
      });
      return await this.petmatchinfoRepository.save(newPetMatchInfo);
    } catch (error) {
      throw new Error(error);
    }
  }

}






