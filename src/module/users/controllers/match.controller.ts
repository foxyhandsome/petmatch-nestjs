import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { MatchService } from '../services/match.service';
import { MatchDao } from '../dao/match.dao';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService, private readonly matchDao: MatchDao) {

  }

  @Get("/get-match-withinfo") //เส้นดูประวัติการจับคู่ทั้งหมด
  async findMatchwithallinfo() {
    try {
      const result = await this.matchService.findMatchwithallinfo();
      return result ;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/get-match/:id_match') //เส้นดูประวัติการจับคู่ด้วย id_match
  async findMatchById(@Param('id_match') id_match: number) {
    const user = await this.matchService.findMatchbyId(id_match);
    if (!user) {
      throw new NotFoundException('หาผู้ใช้ไม่เจอ');
    }
    return user;
  }
  


  @Post('/get-pet-for-match') //เส้นเอาสัตว์เลี้ยงคัดกรองมาจับคู่
  async getPetWithoutUserHome(@Body() reqmatchDto: ReqMatchDto) {
    try {
      // const result = await this.matchService.getPetwithoutUserHome(reqmatchDto);
      // return result
      return this.matchDao.findpetformatch(reqmatchDto)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/get-pet-like') //เส้นประวัติที่เรากดถูกใจหรือส่งข้อเสนอ
  async getPetLike(@Body() reqmatchDto: ReqMatchDto) {
    try {
      // const result = await this.matchService.getPetwithoutUserHome(reqmatchDto);
      // return result
      return this.matchDao.findpetlike(reqmatchDto)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/pet-ticket') //เส้นดูข้อเสนอ
  async petMatchTicket(@Body() reqmatchDto: ReqMatchDto) {
    try {
      // const result = await this.matchService.getPetwithoutUserHome(reqmatchDto);
      // return result
      return this.matchDao.petmatchticket(reqmatchDto)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/reply-pet-match-info') //เส้นตอบกลับหรือกดยอมรับข้อเสนอ ยอมรับการจับคู่หรือไม่จับคู่
  async replyPetMatchInfo(@Body() reqpetmatchinfodto: ReqPetMatchInfoDto) { 
    try {
      const updatedPetmatch = await this.matchDao.updateMatch(reqpetmatchinfodto); 
      return updatedPetmatch;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Post('/create-pet-match-info') //เส้นสร้างการจับคู่หลังจากกดถูกใจหรือไม่ถูกใจ 
  // async createPetMatchInfo(@Body() petmatchInfoDetail: ReqPetMatchInfoDto) {
  //   try {
  //     const newPet = await this.matchService.createpetMatchInfo(petmatchInfoDetail);
  //     return newPet;
  //   } catch (error) {
  //     throw new HttpException(
  //       'เกิดข้อผิดพลาดในการสร้างสัตว์เลี้ยง.',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Post('/create-pet-match-info') //เส้นตอบกลับหรือกดยอมรับข้อเสนอ ยอมรับการจับคู่หรือไม่จับคู่
  async createPetMatchInfo(@Body() reqpetmatchinfodto: ReqPetMatchInfoDto) { 
    try {
      const createPetmatch = await this.matchDao.createpetmatchinfo(reqpetmatchinfodto); 
      return createPetmatch;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }



  @Post('/pet-maybe-review') //เส้นดูรายการสัตว์เลี้ยงที่รีวิว (จะรีวิวก็ได้หรือไม่ก็ได้)
  async petMaybeReview(@Body() reqpetmatchDto: ReqPetMatchInfoDto) {
    try {
      return this.matchDao.petmaybereview(reqpetmatchDto)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/pet-match-history') //เส้นดูประวัติการจับคู่สำเร็จ
  async petMatchHistory(@Body() reqpetmatchDto: ReqPetMatchInfoDto) {
    try {
      return this.matchDao.petmatchhistory(reqpetmatchDto)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}