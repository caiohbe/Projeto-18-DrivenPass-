import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User) {
    return await this.prismaService.user.create({
      data: { ...user },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return await this.prismaService.user.findFirst({
      where: { id },
    });
  }
}
