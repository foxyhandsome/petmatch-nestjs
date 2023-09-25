import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { PetService } from '../services/pet.service';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) { }


  // @Get("/get-pet")
  // getPet() {
  //   return this.petService.findPet();
  // }

  @Get("/get-pet-withinfo") //เส้น api
  async findPetwithallinfo() { //getdistrictsubdistrict คือฟังชั่น
  try {
    const result = await this.petService.findPetwithallinfo(); //เรียกใช้ฟังชั่น findDistrictSubdistrict เเละส่งให้กับ result
    return { message: result };
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}




  @Post('/create-pet')
  async createPet(@Body() createPetDto: CreatePetDto) {
    try {
      const newPet = await this.petService.createPet(createPetDto);
      return newPet;
    } catch (error) {
      throw new HttpException(
        'เกิดข้อผิดพลาดในการสร้างผู้ใช้.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/edit-pet')
  async editPet(@Body() createPetDto: CreatePetDto) {
    try {
      const updatedPet = await this.petService.editPet(createPetDto);
      return updatedPet;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete-Pet/:id')
  async deletePet (@Param('id') petId: string) {
    try {
      const id = parseInt(petId, 10);
      const result = await this.petService.deletePet(id);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
