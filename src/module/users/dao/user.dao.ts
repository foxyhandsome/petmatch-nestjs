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

    async findUsersWithUserTypes(): Promise<ResUserDto[]> {
        try {
            const query = ` SELECT * FROM user INNER JOIN usertype ON user.type_id = usertype.id_type`;
            const results = await this.userRepository.query(query);
            if (!results || results.length === 0) {
                throw new NotFoundException('No users with user types found.');
            }
            return results;
        } catch (error) {
            throw new Error(`Failed to fetch users with user types: ${error.message}`);
        }
    }

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
}
