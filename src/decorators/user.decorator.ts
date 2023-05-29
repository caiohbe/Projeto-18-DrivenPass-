import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from '@prisma/client';

export const UserDecorator = createParamDecorator(
  (data: string, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new NotFoundException('User not found');
    }
    return request.user;
  },
);
