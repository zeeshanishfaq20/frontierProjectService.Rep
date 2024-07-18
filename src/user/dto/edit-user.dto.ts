import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  
export class EditUserDto {
  
    @IsEmail()
    @IsNotEmpty()
    email_address?: string;

    @IsString()
    @IsNotEmpty()
    password?: string;
  }