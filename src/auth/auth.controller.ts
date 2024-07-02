import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('singup')
  singup() {
    return this.authservice.singup();
  }
  @Post('singin')
  singin() {
    return this.authservice.singin();
  }
}
