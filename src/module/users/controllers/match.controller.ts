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