import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Credential } from '@prisma/client';
import { CreateCredentialDto } from './dto/create-credential.dto';

@Injectable()
export class CredentialRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(credential: CreateCredentialDto, userId: number) {
    const { title, url, username, password } = credential;
    return await this.prismaService.credential.create({
      data: {
        userId,
        title,
        url,
        username,
        password,
      },
    });
  }

  async findByTitleAndUserId(
    title: string,
    userId: number,
  ): Promise<Credential> {
    return await this.prismaService.credential.findFirst({
      where: { userId, title },
    });
  }

  async findManyByUserId(userId: number) {
    return await this.prismaService.credential.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(id: number) {
    return await this.prismaService.credential.findFirst({
      where: { id },
    });
  }

  async deleteById(id: number) {
    return await this.prismaService.credential.delete({
      where: {
        id,
      },
    });
  }
}
