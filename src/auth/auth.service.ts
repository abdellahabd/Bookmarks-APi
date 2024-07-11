import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private configservice: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async singup(dto: AuthDto) {
    try {
      const hash = await argon2.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return this.signToken(user.id, user.email);
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

    return this.signToken(getUser.id, getUser.email);
  }

  async signToken(
    id: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: id, email };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configservice.get('sercer'),
    });
    return {
      access_token: token,
    };
  }
}
