
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { UserDao } from '../dao/user.dao';


@Injectable()
export class UsersService {
  constructor(
    private readonly userDao: UserDao,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  // findUsers() {
  //   return this.userRepository.find();
  // }

  async findDistrictSubdistrict() {
    try {
      const userToFindDistrict = await this.userDao.findDistrictSubdistrict();
  
      if (!userToFindDistrict || userToFindDistrict.length === 0) {
        throw new NotFoundException('ไม่พบผู้ใช้');
      }

      return userToFindDistrict;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลผู้ใช้: ${error.message}`);
    }
  }


  async createUser(userDetails: CreateUserDto) {
    try {
      const newUser = this.userRepository.create({
        ...userDetails,
      });
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async editUser(userDetails: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOneById(userDetails.id_user);
      console.log(existingUser);

      if (!existingUser) {
        throw new Error('หาผู้ใช้ไม่เจอ');
      }
      existingUser.username = userDetails.username;
      existingUser.password = userDetails.password;
      return await this.userRepository.save(existingUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: number) {
    try {
      // Find the user by ID
      const userToDelete = await this.userRepository.findOneById(userId);

      if (!userToDelete) {
        throw new Error('หาผู้ใช้ไม่เจอ');
      }
      // Delete the user
      await this.userRepository.remove(userToDelete);
      return `ไอดีผู้ใช้ : ${userId} ได้ถูกลบข้อมูลเรียบร้อยเเล้ว`;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการลบข้อมูล: ${error.message}`);
    }
  }

  async findUsersWithUserTypes(): Promise<ResUserDto[]> {
    try {
      const usersWithTypes = await this.userDao.findUsersWithUserTypes();
      return usersWithTypes;
    } catch (error) {
      throw new Error(`ดึงข้อมูลผู้ใช้ตามประเภทผู้ใช้ไม่สำเร็จ: ${error.message}`);
    }
  }


}




  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }




