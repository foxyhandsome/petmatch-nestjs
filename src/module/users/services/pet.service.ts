
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

  findPet() {
    return this.petRepository.find();
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

  async editPet(petDetails: CreatePetDto) {
    try {
      const existingPet = await this.petRepository.findOneById(petDetails.id_pet);
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




  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }



