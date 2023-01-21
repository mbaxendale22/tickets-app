import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

//custom guard - see auth/guard/
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  //custom decorator - see auth/decorator/
  getMe(@GetUser() user: User) {
    return { req: user };
  }

  @Patch()
  editUser(@GetUser('id') userId, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
