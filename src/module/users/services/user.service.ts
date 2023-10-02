import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDao } from '../dao/user.dao';
import { User } from 'src/entities/User';


@Injectable()
export class UsersService {
  constructor( 
    private readonly userDao: UserDao, //ตัวเเปร userDao เเละรับค่าจาก UserDao
    @InjectRepository(User) private userRepository: Repository<User>, //รับจาก entities
  ) { }

  // findUsers() {
  //   return this.userRepository.find();
  // }

  async findDistrictSubdistrict() {      //ไว้ทำการหาข้อมูลผู้ใช้ที่มีข้อมูลเขตและตำบล  //findDistrictSubdistrict คือฟังชั่น
    try {
      const userToFindDistrict = await this.userDao.findDistrictSubdistrict(); //หาข้อมูลผู้ใช้ที่มีข้อมูลเขตเเละตำบลเเละเรียก querry จาก userdao
  
      if (!userToFindDistrict || userToFindDistrict.length === 0) { //หาไม่เจอเเละไม่มีค่า
        throw new NotFoundException('ไม่พบผู้ใช้');
      }

      return userToFindDistrict;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลผู้ใช้: ${error.message}`);
    }
  }

  async finduserbyid(id_user: number): Promise<User | null> {
    const resUser: ResUserDto[] = await this.userDao.finduserbyid(id_user);

    if (!resUser || resUser.length === 0) {
      return null; 
    }

    const user: User = {
      id_user: resUser[0].id_user,
      username: resUser[0].username,
      password: resUser[0].password,
      information: resUser[0].information,
      contact: resUser[0].contact,
      id_district: resUser[0].id_district,
      id_subdistrict: resUser[0].id_subdistrict,
      id_typeuser: resUser[0].id_typeuser
    };

    return user;
  }

  async createUser(userDetails: CreateUserDto) {  //ไว้สร้างข้อมูลผู้ใช้ใหม่ //createUser คือฟังชั่น โดยสร้างพารามิเตอร์ userDetails ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลของ CreateUserDto
    try {
      const newUser = this.userRepository.create({ //ไว้เก็บข้อมูลผู้ใช้ไว้ในตัวเเปร newUser จากการเก็บค่าข้อมูล userDetails ที่มาจาก CreateUserDto อีกที
        ...userDetails,
      });
      return await this.userRepository.save(newUser); //บันทึกข้อมูลลงข้อมูลใน db
    } catch (error) {
      throw new Error(error);
    }
  }

  async editUser(userDetails: CreateUserDto) { //ไว้เเก้ไขข้อมูลผู้ใช้ //editUser คือฟังชั่น โดยสร้างพารามิเตอร์ userDetails ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลของ CreateUserDto
    try {
      const existingUser = await this.userRepository.findOneById(userDetails.id_user); //ไว้เก็บข้อมูลไอดีผู้ใช้ไว้ในตัวเเปร existingUser
      console.log(existingUser);

      if (!existingUser) { //หาไม่เจอ หรือ ไม่มีค่า
        throw new Error('หาผู้ใช้ไม่เจอ');
      }
      existingUser.username = userDetails.username; 
      existingUser.password = userDetails.password; 
      return await this.userRepository.save(existingUser); // อัปเดตข้อมูลผู้ใช้จาก userDetails ที่รับข้อมูลมาจากโครงสร้างข้อมูล CreateUserDto ที่รับเข้ามาเมื่อเจอผู้ใช้ต้องการเเก้ไข
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(userId: number) { //ไว้ลบข้อมูลผู้ใช้ //ไว้ลบข้อมูลผู้ใช้ //deleteUser คือฟังชั่น โดยสร้างพารามิเตอร์ userId ที่เป็นตัวเลข
    try {
      const userToDelete = await this.userRepository.findOneById(userId); // ไว้ตรวจไอดีผู้ใช้เเละเก็บ

      if (!userToDelete) { //หาไม่เจอไอดี
        throw new Error('หาผู้ใช้ไม่เจอ');
      }
      await this.userRepository.remove(userToDelete); //ลบข้อมูลผู้ใช้เมื่อมีค่าตรงกับ db
      return `ไอดีผู้ใช้ : ${userId} ได้ถูกลบข้อมูลเรียบร้อยเเล้ว`;
    } catch (error) {
      throw new Error(`เกิดข้อผิดพลาดในการลบข้อมูล: ${error.message}`);
    }
  }
}