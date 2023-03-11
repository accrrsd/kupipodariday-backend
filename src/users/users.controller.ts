import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { TransformInterceptor } from '../utils/transform.interceptor';
import { Wish } from '../wishes/entities/wish.entity';
import { WishesService } from '../wishes/wishes.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@UseGuards(JwtGuard)
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(TransformInterceptor)
  @Get('me')
  async getMyUser(@Req() req): Promise<User> {
    return this.usersService.findOneById(req.user.id);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateMyUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    await this.usersService.update(req.user.id, updateUserDto);
    return this.usersService.findOneById(req.user.id);
  }

  @Get('me/wishes')
  async getMyWishes(@Req() req): Promise<Wish[]> {
    return this.wishesService.findManyByOwner(req.user.id);
  }

  @Get(':username')
  async findOneById(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) throw new NotFoundException('Такой пользователь не найден');
    return user;
  }

  @Get(':username/wishes')
  async findWishesByUserName(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    return await this.wishesService.findManyByOwner(user.id);
  }

  @UseInterceptors(TransformInterceptor)
  @Post('find')
  async findMany(@Body() user): Promise<User[]> {
    return this.usersService.findMany(user);
  }
}
