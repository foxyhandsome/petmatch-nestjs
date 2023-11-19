import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { MatchService } from '../services/match.service';
import { MatchDao } from '../dao/match.dao';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService,private readonly matchDao: MatchDao) {
    
   }

  @Post('/get-pet-for-match')
  async getPetWithoutUserHome(@Body() reqmatchDto: ReqMatchDto) {
    try {
      // const result = await this.matchService.getPetwithoutUserHome(reqmatchDto);
      // return result
      return this.matchDao.findpetformatch(reqmatchDto)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/get-pet-like')
  async getPetLike(@Body() reqmatchDto: ReqMatchDto) {
    try {
      // const result = await this.matchService.getPetwithoutUserHome(reqmatchDto);
      // return result
      return this.matchDao.findpetlike(reqmatchDto)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/pet-ticket')
  async petMatchTicket(@Body() reqmatchDto: ReqMatchDto) {
    try {
      // const result = await this.matchService.getPetwithoutUserHome(reqmatchDto);
      // return result
      return this.matchDao.petmatchticket(reqmatchDto)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/reply-pet-match-info') //เส้น api
  async replyPetMatchInfo(@Body() reqpetmatchinfodto: ReqPetMatchInfoDto) { //editUser คือฟังชั่น  โดยสร้างพารามิเตอร์ createUserDto ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลของ CreateUserDto
    try { 
      const updatedPetmatch = await this.matchService.replyPetmatchinfo(reqpetmatchinfodto); //updatedUser คือเเปร เเละมีการเรียกใช้ฟั่งชั่น editUser <-- ถูกส่งข้อมูลผู้ใช้ผ่าน createUserDto
      return updatedPetmatch;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/create-pet-match-info')
  async createPetMatchInfo(@Body() petmatchInfoDetail: ReqPetMatchInfoDto) {
    try {
      const newPet = await this.matchService.createpetMatchInfo(petmatchInfoDetail);
      return newPet;
    } catch (error) {
      throw new HttpException(
        'เกิดข้อผิดพลาดในการสร้างสัตว์เลี้ยง.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}