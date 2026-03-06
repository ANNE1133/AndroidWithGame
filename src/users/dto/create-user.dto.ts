/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  Min,
  Max,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(99)
  age: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(AuthProvider)
  provider: AuthProvider;
}
