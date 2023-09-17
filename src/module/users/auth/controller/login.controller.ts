import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { LoginService } from '../service/login.service';



@Controller('auth')
export class LoginController {
  constructor(private olginService: LoginService) { }

  @Post('/login-all')
  async createUser(@Body() loginDto: LoginDto) {
    try {
      const newUser = await this.olginService.login(loginDto);
      return newUser;
    } catch (error) {
      throw new HttpException(
        'หาผู้ใช้ไม่เจอ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
