import {
  Body,
  Controller,
  Delete,
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

import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

import { Wishlist } from './entities/wishlist.entity';

import { WishlistsService } from './wishlists.service';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @UseInterceptors(TransformInterceptor)
  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(req.user, createWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const wishlist = await this.wishlistsService.findOneById(id);
    if (!wishlist) throw new NotFoundException('Не найдено');
    return wishlist;
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.update(id, updateWishlistDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wishlistsService.remove(id);
  }
}
