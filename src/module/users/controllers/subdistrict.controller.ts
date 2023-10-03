import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { SubDistrictService } from '../services/subdistrict.service';

@Controller('subdistrict')
export class SubdistrictController {
  constructor(private subdistrictService: SubDistrictService) { } //ตัวเเปร userService เเละรับค่าจาก UsersService
  
  @Get('/get-subdistrictbydistrictid/:id_district') 
    async findsubdistrictbyDistrictid(@Param('id_district') id_district: number) {
      const subdistrict = await this.subdistrictService.findSubDistrictbydistrictid(id_district);
      if (!subdistrict) {
        throw new NotFoundException('หาผู้ใช้ไม่เจอ');
      }
      return subdistrict;
    }
}