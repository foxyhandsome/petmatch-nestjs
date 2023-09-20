
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';


@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, //รับจาก entities
  ) { }

  // findUsers() {
  //   return this.userRepository.find();
  // }


  async login(loginReq: LoginDto): Promise<User | null> { //login คือฟังชั่น โดยสร้างพารามิเตอร์ LoginDto ที่เป็นอ๊อบเจ้กของ LoginDto
    const query = `
    SELECT * FROM user
    INNER JOIN user_type ON user.id_typeuser = user_type.id_typeuser 
    WHERE username = ? and password = ? and user_type.type_name = "ผู้ดูเเลระบบ";
    `;
    const [user] = await this.userRepository.query(query, [loginReq.username, loginReq.password]); //ค้นหาข้อมูลผู้ใช้ใน db
    if (!user) {
      throw new NotFoundException('หาผู้ใช้ไม่เจอ');
    }
    return user;
  }

}







