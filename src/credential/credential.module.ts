import { Module } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CredentialController } from './credential.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CredentialRepository } from './credential.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule],
  controllers: [CredentialController],
  providers: [CredentialService, CredentialRepository],
})
export class CredentialModule {}
