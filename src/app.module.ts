import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CredentialModule } from './credential/credential.module';

@Module({
  imports: [UsersModule, AuthModule, PrismaModule, CredentialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
