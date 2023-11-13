
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from 'src/entities/Pet';
import { MatchDao } from '../dao/match.dao';
import { Petmatchinfo } from 'src/entities/Petmatchinfo';


@Injectable()
export class MatchService {
  constructor(
    private readonly matchDao: MatchDao,
    @InjectRepository(Petmatchinfo) private petmatchinfoRepository: Repository<Petmatchinfo>,
  ) { }

  async getPetforMatch(reqmatchDto: ReqMatchDto) {
    return this.matchDao.findpetformatch(reqmatchDto)
  }

  async createpetMatchInfo(petmatchInfoDetail: ReqPetMatchInfoDto) {
    try {
      const newPetMatchInfo = this.petmatchinfoRepository.create({
        ...petmatchInfoDetail,
      });
      return await this.petmatchinfoRepository.save(newPetMatchInfo);
    } catch (error) {
      throw new Error(error);
    }
  }

}






