import { IsString, IsNotEmpty } from 'class-validator';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';

export class CreateUserDto extends AuthLoginDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
