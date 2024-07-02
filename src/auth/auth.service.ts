import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  singup() {
    return { msg: 'i m signed up ' };
  }
  singin() {
    return { msg: 'i m signed in' };
  }
}
