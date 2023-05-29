import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { CredentialService } from './credential.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('credential')
@UseGuards(AuthGuard)
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Post('')
  create(@Body() credential: CreateCredentialDto, @UserDecorator() user: User) {
    try {
      return this.credentialService.create(credential, user.id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('')
  findAll(@UserDecorator() user: User) {
    try {
      return this.credentialService.findAll(user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @UserDecorator() user: User) {
    try {
      return this.credentialService.findOne(+id, user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserDecorator() user: User) {
    return this.credentialService.remove(+id, user);
  }
}
