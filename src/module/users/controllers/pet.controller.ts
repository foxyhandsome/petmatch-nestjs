import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { PetService } from '../services/pet.service';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) { }


  // @Get("/get-pet")
  // getPet() {
  //   return this.petService.findPet();
  // }

  @Get("/get-pet-withinfo") //เส้นดูสัตว์เลี้ยง
  async findPetwithallinfo() {
    try {
      const result = await this.petService.findPetwithallinfo();
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/get-pet/:id_pet') //เส้นดึงสัตว์เลี้ยงโดยใช้ไอดีวัตว์เลี้ยง
  async findPetById(@Param('id_pet') id_pet: number) {
    const pet = await this.petService.findpetbyid(id_pet);
    if (!pet) {
      throw new NotFoundException('หาสัตว์เลี้ยงไม่เจอ');
    }
    return pet;
  }

  @Get('/get-pet-by-userid/:id_user') //เส้นดึงสัตว์เลี้ยงโดยใช้ไอดีผู้ใช้
  async findPetByUserId(@Param('id_user') id_user: number) {
    const pet = await this.petService.findpetbyuserid(id_user);
    if (!pet) {
      throw new NotFoundException('หาสัตว์เลี้ยงไม่เจอ');
    }
    return pet;
  }

  @Post('/create-pet') //เส้นสร้างสัตว์เลี้ยง
  async createPet(@Body() createPetDto: CreatePetDto) {
    try {
      const newPet = await this.petService.createPet(createPetDto);
      return newPet;
    } catch (error) {
      throw new HttpException(
        'เกิดข้อผิดพลาดในการสร้างสัตว์เลี้ยง.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/edit-pet/:id') //เส้นเเก้ไขสัตว์เลี้ยงโดยใช้ไอดีสัตว์เลี้ยง
  async editPet(@Param('id') id_pet: number, @Body() createPetDto: CreatePetDto) {
    try {
      const updatedPet = await this.petService.editPet(id_pet, createPetDto);
      return updatedPet;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete-Pet/:id') //เส้นลบสัตว์เลี้ยงโดยใช้ไอดีสัตว์เลี้ยง
  async deletePet(@Param('id') petId: number) {
    try {
      // const id = parseInt(petId, 10);
      const result = await this.petService.deletePet(petId);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
