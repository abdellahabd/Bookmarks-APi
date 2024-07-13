import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

import { GetUser } from '../auth/decorators/get-user';
import { UserService } from './user.service';
import { EditDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userservise: UserService) {}
  @Get('me')
  getuser(@GetUser() user: User) {
    return user;
  }

  @Patch()
  edituser(@GetUser('id') userid: number, @Body() dto: EditDto) {
    return this.userservise.edituser(userid, dto);
  }
}
