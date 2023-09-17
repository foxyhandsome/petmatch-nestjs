import { UserDao } from './dao/user.dao';
import { UserType } from '../../entities/UserType';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';
import { ReviewService } from './services/review.service';
import { ReviewDao } from './dao/review.dao';
import { ReviewController } from './controllers/review.controller';
import { District } from 'src/entities/District';
import { Pet } from 'src/entities/Pet';
import { PetBreed } from 'src/entities/PetBreed';
import { Petmatchinfo } from 'src/entities/Petmatchinfo';
import { Review } from 'src/entities/Review';
import { Skintype } from 'src/entities/Skintype';
import { Subdistrict } from 'src/entities/Subdistrict';
import { Bloodtype } from 'src/entities/ฺBloodtype';
import { PetController } from './controllers/pet.controller';
import { PetService } from './services/pet.service';
import { PetDao } from './dao/pet.dao';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType , Bloodtype , District , Pet , PetBreed , Petmatchinfo , Review , Skintype , Subdistrict])],
  controllers: [UsersController , ReviewController , PetController],
  providers: [UsersService, UserDao , ReviewService , ReviewDao , PetService , PetDao],
})
export class UsersModule { }
