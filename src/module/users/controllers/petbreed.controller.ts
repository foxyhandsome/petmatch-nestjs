import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { PetBreedService } from '../services/petbreed.service';

@Controller('petbreed')
export class PetBreedController {
  constructor(private petbreedService: PetBreedService) { } //ตัวเเปร userService เเละรับค่าจาก UsersService

  @Get("/get-petbreed") //เส้นดึงสายพันธุ์สัตว์เลี้ยง
  Getpetbreed() { 
      return this.petbreedService.getPetBreed()
  }

}