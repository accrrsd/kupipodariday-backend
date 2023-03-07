import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WishesModule } from '../wishes/wishes.module';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

import { User } from './entities/User.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  exports: [UsersService],
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User, Wishlist]), WishesModule],
})
export class UsersModule {}
