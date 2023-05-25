import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    PrismaModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
