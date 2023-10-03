import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { DistrictService } from '../services/district.service';

@Controller('district')
export class DistrictController {
  constructor(private districtService: DistrictService) { } //ตัวเเปร userService เเละรับค่าจาก UsersService

  @Get("/get-district") 
  Getdistrict() { 
      return this.districtService.getDistrict()
  }

}