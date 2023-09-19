import { Controller, Post, Delete, Body, Param, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from '../services/user.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get('/users-with-types')
  async findUsersWithUserTypes() {
    return this.userService.findUsersWithUserTypes();
  }


  // @Get("/get-user")
  // getUsers() {
  //   return this.userService.findUsers();
  // }

  @Get("/get-district-subdistrict")
  async getdistrictsubdistrict() {
  try {
    const result = await this.userService.findDistrictSubdistrict();
    return { message: result };
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}


  @Post('/create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return newUser;
    } catch (error) {
      throw new HttpException(
        'เกิดข้อผิดพลาดในการสร้างผู้ใช้.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/edit-user')
  async editUser(@Body() createUserDto: CreateUserDto) {
    try {
      const updatedUser = await this.userService.editUser(createUserDto);
      return updatedUser;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete-user/:id')
  async deleteUser(@Param('id') userId: string) {
    try {
      const id = parseInt(userId, 10);
      const result = await this.userService.deleteUser(id);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
