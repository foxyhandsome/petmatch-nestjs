
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetDao } from '../dao/pet.dao';
import { Pet } from 'src/entities/Pet';


@Injectable()
export class PetService {
  constructor(
    private readonly petDao: PetDao,
    @InjectRepository(Pet) private petRepository: Repository<Pet>,
  ) { }

  async findPetwithallinfo() {      //ไว้ทำการหาข้อมูลผู้ใช้ที่มีข้อมูลเขตและตำบล  //findDistrictSubdistrict คือฟังชั่น
    try {
      const petToFind = await this.petDao.findPetwithallinfo(); //หาข้อมูลผู้ใช้ที่มีข้อมูลเขตเเละตำบลเเละเรียก querry จาก userdao
  
      if (!petToFind || petToFind.length === 0) { //หาไม่เจอเเละไม่มีค่า
        throw new NotFoundException('ไม่พบผู้ใช้');
      }

      return petToFind;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลผู้ใช้: ${error.message}`);
    }
  }

  async findpetbyid(id_pet: number): Promise<Pet | null> {
    const resPet: ResPetDto = await this.petDao.findpetbyid(id_pet);
    return resPet;
  }

  async createPet(petDetails: CreatePetDto) {
    try {
      const newPet = this.petRepository.create({
        ...petDetails,
      });
      return await this.petRepository.save(newPet);
    } catch (error) {
      throw new Error(error);
    }
  }

  async editPet(id_pet: number,petDetails: CreatePetDto) {
    try {
      const existingPet = await this.petRepository.findOneById(id_pet);
      console.log(existingPet);

      if (!existingPet) {
        throw new Error('หาสัตว์เลี้ยงไม่เจอ');
      }
      existingPet.picture_pet = petDetails.picture_pet;
      existingPet.sex_pet	 = petDetails.sex_pet;
      existingPet.health_pet	= petDetails.health_pet;
      existingPet.name_pet	= petDetails.name_pet;
      existingPet.age_pet	= petDetails.age_pet;
      existingPet.id_skin 	= petDetails.id_skin;
      existingPet.id_blood	= petDetails.id_blood;
      existingPet.id_user	= petDetails.id_user;
      existingPet.id_breed	= petDetails.id_breed;

      return await this.petRepository.save(existingPet);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePet(petId: number) {
    try {
      // Find the user by ID
      const petToDelete = await this.petRepository.findOneById(petId);

      if (!petToDelete) {
        throw new Error('หาสัตว์เลี้ยงไม่เจอ');
      }
      // Delete the user
      await this.petRepository.remove(petToDelete);
      return `สัตว์เลี้ยงไอดีที่: ${petId} ได้ถูกลบเรียบร้อยเเล้ว`;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการลบสัตว์เลี้ยง: ${error.message}`);
    }
  }
}






