import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { LoginService } from '../service/login.service';



@Controller('auth')
export class LoginController {
  constructor(private loginService: LoginService) { } //ตัวเเปร loginService เเละรับค่าจาก LoginService
  
  @Post('/login-all') //เส้น api
  async createUser(@Body() loginDto: LoginDto) { //createUser คือฟังชั่น โดยสร้างพารามิเตอร์ loginDtto ที่เป็นอ๊อบเจ้กของ LoginDto
    try {
      const newUser = await this.loginService.login(loginDto); //เรียกใช้ฟังชั่น login จาก service ที่ถูกส่งมาจาก loginDto
      return newUser;
    } catch (error) {
      throw new HttpException(
        'หาผู้ใช้ไม่เจอ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
