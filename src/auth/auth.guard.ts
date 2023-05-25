import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    const token = (authorization ?? '').split(' ')[1];

    // try {
    const data = await this.authService.checkToken(token);
    const user = await this.userService.getById(+data.sub);
    request.user = user;
    // } catch (error) {
    //   console.log(error);
    //   return false;
    // }

    return true;
  }
}
