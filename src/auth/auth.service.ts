import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

import { compare } from '../utils/functions';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  authorize(user: User): { access_token: string } {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validate(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) throw new NotFoundException('Неверные данные');
    return await compare(password, user);
  }
}
