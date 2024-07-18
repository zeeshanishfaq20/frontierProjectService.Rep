import { Body, Controller, Get, UseGuards, Post, Param } from "@nestjs/common";
import { Patch } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { User } from "@prisma/client";
import { hash } from "argon2";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { EditUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    
    @Post ('signup')
    signup(@Body()  dto: EditUserDto) {
        return this.userService.signup(dto);
    }
    
    
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }
    @Patch ()
    editUser(
        @GetUser('id') id: number,
        @Body() dto: EditUserDto,
    ){
        return this.userService.editUser(id, dto)
    }

    @Get('confirm/:token')
    async confirmEmail(@Param('token') token: string) {
      const result = await this.userService.confirmEmail(token);
      return result;
    }
}
