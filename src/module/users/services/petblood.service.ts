
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bloodtype } from 'src/entities/ฺBloodtype';


@Injectable()
export class PetBloodService {
  constructor(
    @InjectRepository(Bloodtype) private petbloodRepository: Repository<Bloodtype>,
  ) { }

  async getPetBlood() {
    return this.petbloodRepository.find();
  }

}






