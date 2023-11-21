import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/user.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) { } //ตัวเเปร userService เเละรับค่าจาก UsersService

  // @Get('/users-with-types')
  // async findUsersWithUserTypes() {
  //   return this.userService.findUsersWithUserTypes();
  // }


  @Get("/get-all-user") //เส้นดึงผู้ใช้ทั้งหมด
  getUsers() {
    return this.userService.findAllUsers();
  }

  @Get("/get-user-withdistrict-subdistrict") //เส้นดึงผู้ใช้ที่มีข้อมูลทั้งเขตทั้งเเขวง
  async getdistrictsubdistrict() { //getdistrictsubdistrict คือฟังชั่น
  try {
    const result = await this.userService.findDistrictSubdistrict(); //เรียกใช้ฟังชั่น findDistrictSubdistrict เเละส่งให้กับ result
    return { message: result };
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  @Get('/get-user/:id_user') //เส้นดึงผู้ใช้โดยไอดีของผู้ใช้
    async findUserById(@Param('id_user') id_user: number) {
      const user = await this.userService.finduserbyid(id_user);
      if (!user) {
        throw new NotFoundException('หาผู้ใช้ไม่เจอ');
      }
      return user;
    }

  @Get("/get-user-by-user") //เส้นดึงผู้ใช้ที่มีสิทธิ์เเค่ผู้ใช้ทั่วไป
    async findUserbyuser() { 
    try {
      const result = await this.userService.finduserbyuser(); //เรียกใช้ฟังชั่น findDistrictSubdistrict เเละส่งให้กับ result
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('/create-user') //เส้นสร้างผู้ใช้
  async createUser(@Body() createUserDto: CreateUserDto) { //createUser คือฟังชั่น  โดยสร้างพารามิเตอร์ createUserDto ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลของ CreateUserDto
    try {
      const newUser = await this.userService.createUser(createUserDto); //newUserคือเเปร เเละมีการเรียกใช้ฟั่งชั่น createUser <-- ถูกส่งข้อมูลผู้ใช้ผ่าน createUserDto 
      return newUser;
    } catch (error) {
      throw new HttpException(
        'เกิดข้อผิดพลาดในการสร้างผู้ใช้.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/edit-user/:id') //เส้นเเก้ไขผู้ใช้โดยใช้ไอดีผู้ใช้
  async editUser(@Param('id') id_user:number ,@Body() createUserDto: CreateUserDto) { //editUser คือฟังชั่น  โดยสร้างพารามิเตอร์ createUserDto ที่เป็นอ๊อบเจ้กที่ดึงข้อมูลของ CreateUserDto
    try { 
      const updatedUser = await this.userService.editUser(id_user,createUserDto); //updatedUser คือเเปร เเละมีการเรียกใช้ฟั่งชั่น editUser <-- ถูกส่งข้อมูลผู้ใช้ผ่าน createUserDto
      return updatedUser;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete-user/:id') //เส้นลบผู้ใช้โดยใช้ไอดีผู้ใช้
  async deleteUser(@Param('id') userId: string) { //deleteUser คือฟังชั่น
    try {
      const id = parseInt(userId, 10);
      const result = await this.userService.deleteUser(id); //result คือเเปร เเละมีการเรียกใช้ฟั่งชั่น deleteUser โดยส่งไอดีผู้ใช้เข้าไป
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
