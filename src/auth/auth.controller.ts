import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { TransformInterceptor } from '../utils/transform.interceptor';
import { LocalGuard } from './guards/local.guard';

@Controller('/')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signin(@Req() req): { access_token: string } {
    return this.authService.authorize(req.user);
  }

  @UseInterceptors(TransformInterceptor)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.authorize(user);
  }
}
