import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerService } from './sendEmail';

@Module({
    imports: [JwtModule.register({})],
    controllers: [UserController],
    providers: [UserService, JwtStrategy, MailerService]
})
export class UserModule {}
