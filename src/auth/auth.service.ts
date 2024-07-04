import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async singup(dto: AuthDto) {
    try {
      const hash = await argon2.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken ');
        }
      }
      throw error;
    }
  }
  async singin(dto: AuthDto) {
    const getUser = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!getUser) {
      throw new ForbiddenException('Credentials incorrect');
    }
    const pwmatch = await argon2.verify(getUser.hash, dto.password);
    if (!pwmatch) {
      throw new ForbiddenException('Credentials incorrect');
    }
    delete getUser.hash;
    return getUser;
  }
}
