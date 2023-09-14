import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/User';
import { UserType } from './entities/UserType';
import { UsersModule } from './module/users/users.module';
import { Bloodtype } from './entities/ฺBloodtype';
import { District } from './entities/District';
import { Pet } from './entities/Pet';
import { PetBreed } from './entities/PetBreed';
import { Petmatchinfo } from './entities/Petmatchinfo';
import { Review } from './entities/Review';
import { Skintype } from './entities/Skintype';
import { Subdistrict } from './entities/Subdistrict';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'rednossisros.thddns.net',
      port: 7551,
      username: 'teddy',
      password: 'Teddynajaa1',
      database: 'petmatch',
      entities: [User, UserType , Bloodtype , District , Pet , PetBreed , Petmatchinfo , Review , Skintype , Subdistrict],
      synchronize: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
