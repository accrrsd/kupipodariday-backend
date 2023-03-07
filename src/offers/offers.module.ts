import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';

import { Wish } from '../wishes/entities/wish.entity';
import { WishesModule } from '../wishes/wishes.module';

import { Offer } from './entities/offer.entity';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

@Module({
  providers: [OffersService],
  controllers: [OffersController],
  imports: [TypeOrmModule.forFeature([Offer, User, Wish]), WishesModule],
})
export class OffersModule {}
