import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { PetBloodService } from '../services/petblood.service';

@Controller('petblood')
export class PetBloodController {
  constructor(private petbloodService: PetBloodService) { } //ตัวเเปร userService เเละรับค่าจาก UsersService

  @Get("/get-petblood") //เส้นดึงกรุ๊ปเลือดสัตว์เลี้ยง
  Getpetblood() { 
      return this.petbloodService.getPetBlood()
  }

}