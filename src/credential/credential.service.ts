import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialRepository } from './credential.repository';
import Cryptr from 'cryptr';
import { User } from '@prisma/client';

@Injectable()
export class CredentialService {
  private cryptr: Cryptr;

  constructor(private readonly credentialRepository: CredentialRepository) {
    this.cryptr = new Cryptr(process.env.CRYPTR_SECRET);
  }

  async create(credential: CreateCredentialDto, userId: number) {
    const dbCredential = await this.credentialRepository.findByTitleAndUserId(
      credential.title,
      userId,
    );

    if (dbCredential) {
      throw new ConflictException();
    }

    credential.password = this.cryptr.encrypt(credential.password);

    return await this.credentialRepository.create(credential, userId);
  }

  async findAll(user: User) {
    const dbCredentials = await this.credentialRepository.findManyByUserId(
      user.id,
    );
    if (!dbCredentials) throw new NotFoundException();

    const decryptedCredentials = dbCredentials.map((credential) => {
      credential.password = this.cryptr.decrypt(credential.password);
      return credential;
    });

    return decryptedCredentials;
  }

  async findOne(id: number, user: User) {
    const dbCredential = await this.credentialRepository.findById(id);

    if (!dbCredential) throw new NotFoundException();
    if (dbCredential.userId !== user.id) throw new UnauthorizedException();

    return dbCredential;
  }

  async remove(id: number, user: User) {
    const dbCredential = await this.credentialRepository.findById(id);
    if (!dbCredential) throw new NotFoundException();
    if (dbCredential.userId !== user.id) throw new UnauthorizedException();

    return await this.credentialRepository.deleteById(id);
  }
}
