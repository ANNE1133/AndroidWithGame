/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(99)
  age: number;
}
