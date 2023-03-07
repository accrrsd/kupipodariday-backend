import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

import { Wish } from '../wishes/entities/wish.entity';
import { WishesModule } from '../wishes/wishes.module';

import { Wishlist } from './entities/Wishlist.entity';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';

@Module({
  imports: [
    UsersModule,
    WishesModule,
    TypeOrmModule.forFeature([Wishlist, Wish, User]),
  ],
  providers: [WishlistsService],
  controllers: [WishlistsController],
})
export class WishlistsModule {}
