
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skintype } from 'src/entities/Skintype';


@Injectable()
export class PetSkinService {
  constructor(
    @InjectRepository(Skintype) private petskinRepository: Repository<Skintype>,
  ) { }

  async getPetSkin() {
    return this.petskinRepository.find();
  }

}






