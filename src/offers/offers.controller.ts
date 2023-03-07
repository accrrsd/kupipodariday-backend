import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateOfferDto } from './dto/create-offer.dto';
import { OffersService } from './offers.service';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { Offer } from './entities/offer.entity';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Offer> {
    const offer = await this.offersService.findOneById(id);
    if (!offer) throw new NotFoundException('Не найдено');
    return offer;
  }

  @Post()
  async create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(req.user, createOfferDto);
  }
}
