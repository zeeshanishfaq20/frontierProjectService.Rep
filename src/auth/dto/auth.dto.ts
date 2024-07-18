import { IsInt, IsEmail, IsNotEmpty, IsString, IsEnum } from "class-validator";
import { Prisma, UserStatus } from '@prisma/client';

export class AuthDto {

    @IsEmail()
    @IsNotEmpty()
    email_address: string;

    @IsString()
    @IsNotEmpty()
    password: string

}