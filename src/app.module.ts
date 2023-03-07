import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './config/config';

import { AuthModule } from './auth/auth.module';
import { OffersModule } from './offers/offers.module';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config().db.host,
      port: config().db.port,
      username: config().db.username,
      password: config().db.password,
      database: config().db.database,
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
  ],
})
export class AppModule {}
