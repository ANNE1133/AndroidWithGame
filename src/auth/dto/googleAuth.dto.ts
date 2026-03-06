/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
export class GoogleAuthDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(['local', 'google'])
  provider: 'google';
}
