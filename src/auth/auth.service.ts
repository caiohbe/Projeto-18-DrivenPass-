import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { LoginAuthDto } from 'src/users/dto/update-user.dto';
import { UserRepository } from 'src/users/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'Driven';
  private AUDIENCE = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async createToken(user: User) {
    const { name, email } = user;
    const token = this.jwtService.sign(
      {
        name,
        email,
      },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return {
      accessToken: token,
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async login(user: LoginAuthDto) {
    const { email, password } = user;
    const registeredUser = await this.userRepository.findByEmail(email);
    if (!registeredUser) {
      throw new HttpException('Email não registrado.', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      registeredUser.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Senha incorreta.', HttpStatus.CONFLICT);
    }

    return this.createToken(registeredUser);
  }
}
