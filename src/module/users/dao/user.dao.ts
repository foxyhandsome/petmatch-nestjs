import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';


@Injectable()
export class UserDao {
    constructor(
        @InjectRepository(User) //รับจาก entities
        private readonly userRepository: Repository<User>, 
    ) { }

    async findDistrictSubdistrict(): Promise<ResUserDto[]> {
        try {
          const query = `
            SELECT * FROM user
            INNER JOIN district ON district.id_district = user.id_district
            INNER JOIN subdistrict ON subdistrict.id_subdistrict = user.id_subdistrict`;
      
          const results = await this.userRepository.query(query); 
      
          if (!results || results.length === 0) {
            throw new NotFoundException('ไม่พบผู้ใช้');
          }
      
          return results;
        } catch (error) {
          throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลผู้ใช้: ${error.message}`);
        }
      }

      async finduserbyid(id_user: number): Promise<ResUserDto> {
        try {
          const query = `
            SELECT * FROM user
            INNER JOIN district ON district.id_district = user.id_district
            INNER JOIN subdistrict ON subdistrict.id_subdistrict = user.id_subdistrict  
            WHERE user.id_user = ? `; 

          const results = await this.userRepository.query(query, [id_user]); 

          if (!results || results.length === 0) {
            throw new NotFoundException('หาไอดีผู้ใช้ไม่เจอ');
          }

          return results;
        } catch (error) {
          throw new Error(`เกิดข้อผิดพลาดในการค้นหาไอดีผู้ใช้: ${error.message}`);
        }
      }

      async findUserbyUser(): Promise<ResUserDto[]> {
        try {
          const query = `
            SELECT * 
            FROM user
            WHERE user.id_typeuser = 1
            `;
      
          const results = await this.userRepository.query(query); 
      
          if (!results || results.length === 0) {
            throw new NotFoundException('ไม่พบผู้ใช้');
          }
      
          return results;
        } catch (error) {
          throw new Error(`เกิดข้อผิดพลาดในการค้นหาข้อมูลผู้ใช้: ${error.message}`);
        }
      }
}
