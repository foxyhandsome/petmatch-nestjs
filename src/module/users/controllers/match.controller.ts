import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { MatchService } from '../services/match.service';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) { } //ตัวเเปร userService เเละรับค่าจาก UsersService
  
  @Post('/get-pet-without-userhome') 
    async getpetwithoutuserhome(@Body() reqmatchDto: ReqMatchDto) {
      try {
        const result = await this.matchService.getPetwithoutUserHome(); 
        return result
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}