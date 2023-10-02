import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { DistrictService } from '../services/district.service';

@Controller('district')
export class DistrictController {
  constructor(private districtService: DistrictService) { } //ตัวเเปร userService เเละรับค่าจาก UsersService

  @Get("/get-district") 
    async Getdistrict() { 
    try {
      const result = await this.districtService.getDistrict(); 
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
