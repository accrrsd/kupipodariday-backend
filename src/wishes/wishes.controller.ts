import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { Wish } from './entities/wish.entity';
import { WishesService } from './wishes.service';

import { UseInterceptors } from '@nestjs/common/decorators';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
@UseInterceptors(ClassSerializerInterceptor)
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto): Promise<Wish> {
    this.wishesService.create(req.user, createWishDto);
    return;
  }

  @Get('last')
  async findLastWishes(): Promise<Wish[]> {
    return await this.wishesService.findLastWishes();
  }

  @Get('top')
  async findTopWishes(): Promise<Wish[]> {
    return await this.wishesService.findTopWishes();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wish> {
    return await this.wishesService.findOneById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateWish(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const wish = await this.wishesService.findOneById(id);

    if (req.user.id !== wish.owner.id)
      throw new ForbiddenException('Ошибка доступа');
    await this.wishesService.update(id, updateWishDto);
    return;
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteWish(@Req() req, @Param('id') id: number): Promise<Wish> {
    const wish = await this.wishesService.findOneById(id);

    if (req.user.id !== wish.owner.id)
      throw new ForbiddenException('Ошибка доступа');
    await this.wishesService.remove(id);
    return wish;
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(@Param('id') id: number): Promise<Wish> {
    await this.wishesService.copy(id);
    return;
  }
}
