
import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  findUsers() {
    return this.userRepository.find();
  }

  createUser(userDetails: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...userDetails,
    });
    return this.userRepository.save(newUser);
  }

  // updateUser(id: number, updateUserDetails: UpdateUserParams) {
  //   return this.userRepository.update({ id }, { ...updateUserDetails });
  // }

  // deleteUser(id: number) {
  //   return this.userRepository.delete({ id });
  // }




}
