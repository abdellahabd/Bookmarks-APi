import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('singup')
  singup(@Body() dto: AuthDto) {
    return this.authservice.singup(dto);
  }
  @Post('singin')
  singin(@Body() dto: AuthDto) {
    return this.authservice.singin(dto);
  }
}
