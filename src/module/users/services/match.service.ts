
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Petmatchinfo } from 'src/entities/Petmatchinfo';
import { Pet } from 'src/entities/Pet';


@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Pet) 
    private petRepository: Repository<Pet>,
  ) { }

  async getPetwithoutUserHome() {
    return this.petRepository.find();
  }

}






