import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditDto {
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  firstname?: string;
  @IsString()
  @IsOptional()
  lastnam?: string;
}
