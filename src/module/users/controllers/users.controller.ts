import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get("/get")
  getUsers() {
    return this.userService.findUsers();
  }

  @Post("/save")
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @Put(':id')
  // async updateUserById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   await this.userService.updateUser(id, updateUserDto);
  // }

  // @Delete(':id')
  // async deleteUserById(@Param('id', ParseIntPipe) id: number) {
  //   await this.userService.deleteUser(id);
  // }

}
