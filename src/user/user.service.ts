import { Injectable } from '@nestjs/common';
import { EditDto } from './dto';
import { PrismaService } from '../../src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async edituser(userid: number, dto: EditDto) {
    const user = await this.prisma.user.update({
      where: { id: userid },
      data: { ...dto },
    });
    delete user.hash;
    return user;
  }
}
