import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 3,
    minLowercase: 0,
    minSymbols: 0,
    minNumbers: 0,
    minUppercase: 0,
  })
  password: string;
}
