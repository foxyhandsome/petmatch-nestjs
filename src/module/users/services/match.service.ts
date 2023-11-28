
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

  // async getPetforMatch(reqmatchDto: ReqMatchDto) {
  //   return this.matchDao.findpetformatch(reqmatchDto)  //เส้นดึงสัตว์เลี้ยงมาจับคู่ //ไม่ได้เชื่อมกับ service เชื่อมกับ dao เลย
  // }

  // async getPetlike(reqmatchDto: ReqMatchDto) {
  //   return this.matchDao.findpetlike(reqmatchDto)  //เส้นดึงสัตว์เลี้ยงมาจับคู่ //ไม่ได้เชื่อมกับ service เชื่อมกับ dao เลย
  // }

  // async PetmatchTicket(reqmatchDto: ReqMatchDto) {
  //   return this.matchDao.petmatchticket(reqmatchDto)  //เส้นดึงสัตว์เลี้ยงมาจับคู่ //ไม่ได้เชื่อมกับ service เชื่อมกับ dao เลย
  // }

  // async PetMaybeReview(reqmatchDto: ReqMatchDto) {
  //   return this.matchDao.petmatchticket(reqmatchDto)  //เส้นดึงสัตว์เลี้ยงมาจับคู่ //ไม่ได้เชื่อมกับ service เชื่อมกับ dao เลย
  // }

  async findMatchbyId(id_match: number) {
    const resUser: ResUserDto = await this.matchDao.findmatchbyid(id_match);
    return resUser;
  }





  async replyPetmatchinfo(petmatchDetails: ReqPetMatchInfoDto) {//เส้นกดยอมรับข้อเสนอหรือปฏิเสธ
    try {
      const replypetmatchinfo = await this.petmatchinfoRepository.findOneById(petmatchDetails.id_match);

      if (!replypetmatchinfo) {
        throw new NotFoundException('ไม่พบข้อมูล'); // ใช้ NotFoundException แทนการ throw Error
      }
      console.log(petmatchDetails)
      console.log(replypetmatchinfo)
      replypetmatchinfo.match_userguest = true;
      replypetmatchinfo.match_userguest_deny = true;
      console.log(replypetmatchinfo);
      const newPetMatchInfo = this.petmatchinfoRepository.create({
        ...replypetmatchinfo,
      });

      return await this.petmatchinfoRepository.save(newPetMatchInfo);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findMatchwithallinfo() {      
    try {
      const matchToFind = await this.matchDao.findMatchwithallinfo(); 
  
      if (!matchToFind || matchToFind.length === 0) { 
        throw new NotFoundException('ไม่พบสัตว์เลี้ยง');
      }

      return matchToFind;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลสัตว์เลี้ยง: ${error.message}`);
    }
  }


  // async createpetMatchInfo(petmatchInfoDetail: ReqPetMatchInfoDto) { //เส้นสร้างประวัติการจับคู่ หรือ จับคู่ //เส้นนี้พัง
  //   try {
  //     const newPetMatchInfo = this.petmatchinfoRepository.create({
  //       ...petmatchInfoDetail,
  //     });
  //     return await this.petmatchinfoRepository.save(newPetMatchInfo);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

}






