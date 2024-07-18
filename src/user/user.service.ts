import { Injectable } from "@nestjs/common/decorators";
import { ForbiddenException } from "@nestjs/common";
import { EditUserDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { MailerService  } from "./sendEmail";
import { VerificationCode } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        private mailservice: MailerService,
        ) {}
    
    // Signup a new user and save the user in database 
    async signup(dto: EditUserDto) {

        // Check if this user already exists.
        const existingUser = await this.prisma.user.findUnique({
            where: { email_address: dto.email_address},
        });
        if (existingUser) {
            throw new Error('That user already exists!');
        }
        // generate the password hash
        const hash = await argon.hash(dto.password)
        // save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email_address: dto.email_address,
                    hash,
                    status: 'INACTIVE',
                }
            })
        //  Generating the token for user verification
        const token = await this.generateEmailVerificationToken({ email_address: dto.email_address }, '1h');
        
        // Store the user_id and hash in the VerificationCode model
        const verificationCode = await this.createVerificationCode(user, token);

        // Send verification email
        const link = `${process.env.BASE_URL}/${await token}`;
        const emailContent = `<p>Hello,</p>
                              <p>Welcome to the application.</p>
                              <p>Please click on the link to verify your account:</p>
                              <p><a href="${link}">${link}</a></p>`;
        await this.mailservice.sendEmail(dto.email_address, 'Email Verification\n', emailContent);
  
        return {
            message: 'Email Verification link sent to your email',
        };
        } catch (error) {
            if (
                error instanceof
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken'
                    )
                }
            }
        };

    }

    //  Update the User 
        async editUser ( user_Id: number, dto: EditUserDto) {
          const user = await this.prisma.user.update({
            where: {
                 id: user_Id,
            },
            data: {
                ...dto,
            },
          });
          delete user.hash;
          return user;
      }

    // Generate token using jwt
    async generateEmailVerificationToken(payload: any, expiresIn: string) {
        const secret = this.config.get('JWT_SECRET');
        return this.jwt.sign(await payload, { secret, expiresIn });
      }
    
    // Setup Database hooks to store password as hash
    async setupHooks() {
        (this.prisma as any).$on('beforeCreate', async (data) => {
          if ('hash' in data) {
            const hash = await argon.hash(data.hash);
            data.hash = hash;
          }
        });
        (this.prisma as any).$on('beforeUpdate', async ({ where, data }) => {
            if ('password' in data) {
              const hash = await argon.hash(data.password);
              data.password = hash;
            }
          });
      }

    // confirm email by verifying JWT using email address
    async confirmEmail(token: string) {
        try {
          const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
          const email_address = decoded.email_address;
          const user = await this.prisma.user.findUnique({
            where: { email_address: email_address },
          });
          if (!user) {
            throw new Error('User not found');
          }
          else if (user.status === "ACTIVE") {
            throw new Error(' Email already confirmred')
          }
          else await this.prisma.user.update({
            where: { email_address: email_address },
            data: { status: 'ACTIVE' },
          });
          return { message: 'Email confirmed' };
        } catch (error) {
          throw new Error('Invalid token: '+ error);
        }
      }

    //  Create a token, user_id and hash in VerificationCode Model
    async createVerificationCode(user, token) {
      const verificationCode = await this.prisma.verificationCode.create({ 
        data: {
          user: { connect: { id: user.id } },
          token, 
        } 
        });
        return verificationCode;
      }
}