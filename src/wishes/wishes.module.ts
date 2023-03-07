import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Wish } from './entities/Wish.entity';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';

@Module({
  exports: [WishesService],
  providers: [WishesService],
  controllers: [WishesController],
  imports: [TypeOrmModule.forFeature([Wish])],
})
export class WishesModule {}
