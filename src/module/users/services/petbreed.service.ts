
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetBreed } from 'src/entities/PetBreed';


@Injectable()
export class PetBreedService {
  constructor(
    @InjectRepository(PetBreed) private petbreedRepository: Repository<PetBreed>,
  ) { }

  async getPetBreed() {
    return this.petbreedRepository.find();
  }

}






