import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { PetSkinService } from '../services/petskin.service';

@Controller('petskin')
export class PetSkinController {
  constructor(private petskinService: PetSkinService) { } //ตัวเเปร userService เเละรับค่าจาก UsersService

  @Get("/get-petskin") //เส้นดึงสีขนสัตว์เลี้ยง
  Getpetskin() { 
      return this.petskinService.getPetSkin()
  }

}