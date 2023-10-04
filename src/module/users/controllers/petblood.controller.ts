import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { PetBloodService } from '../services/petblood.service';

@Controller('petblood')
export class PetBloodController {
  constructor(private petbloodService: PetBloodService) { } //ตัวเเปร userService เเละรับค่าจาก UsersService

  @Get("/get-petblood") 
  Getpetblood() { 
      return this.petbloodService.getPetBlood()
  }

}