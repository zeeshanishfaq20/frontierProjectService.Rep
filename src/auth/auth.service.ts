import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config/dist";

@Injectable({})
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async signin(dto: AuthDto) {
        //  Find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email_address: dto.email_address,
            }
        })
        //  If user does not exist through exception
        if (!user) throw new ForbiddenException(
            'Credenticials incorrect',
        )
        //  compare password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        )
        //  If password incorrect throw exception
        if (!pwMatches) throw new ForbiddenException(
            'Credentials incorrect',
        )
        return this.signToken(user.user_id, user.email_address)
    }
    async signToken(
        user_Id: string,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: user_Id,
            email,
        };
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn: '60m',
                secret: secret,
            },
        );
        return {
            access_token: token,
        };
    }
}