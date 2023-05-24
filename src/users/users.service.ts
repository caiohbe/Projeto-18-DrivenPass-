import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private SALT = 10;

  constructor(private userRepository: UserRepository) {}

  create(@Body() body: CreateUserDto) {
    const email = body.email;
    const registeredUser = this.userRepository.findByEmail(email);
    if (registeredUser) {
      throw new HttpException('Usuário já registrado', HttpStatus.FORBIDDEN);
    }

    const user: User = {
      ...body,
      password: bcrypt.hashSync(body.password, this.SALT),
    };
    this.userRepository.create(user);
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
