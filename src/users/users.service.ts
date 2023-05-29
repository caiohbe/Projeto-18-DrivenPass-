import {
  Injectable,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private SALT = 10;

  constructor(private userRepository: UserRepository) {}

  async create(body: CreateUserDto) {
    const email = body.email;
    const registeredUser = await this.userRepository.findByEmail(email);
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

  async getById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException();

    return user;
  }
}
