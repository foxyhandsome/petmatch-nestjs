
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Petmatchinfo } from 'src/entities/Petmatchinfo';
import { Pet } from 'src/entities/Pet';
import { MatchDao } from '../dao/match.dao';


@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Pet)
    private readonly matchDao: MatchDao,
    private petRepository: Repository<Pet>,
  ) { }

  async getPetwithoutUserHome(reqmatchDto: ReqMatchDto) {


    return this.matchDao.findpetwithoutuserhome(reqmatchDto)

  }

}






