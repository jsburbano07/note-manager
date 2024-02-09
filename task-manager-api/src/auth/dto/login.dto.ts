import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  readonly username: string;

  @IsString()
  readonly password: string;
}
