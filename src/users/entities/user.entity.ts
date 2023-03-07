import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEmpty,
  IsFQDN,
  IsNotEmpty,
  IsOptional,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import { baseEntity } from '../../utils/baseEntity';
import { hash } from '../../utils/functions';

import { Offer } from '../../offers/entities/offer.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User extends baseEntity {
  @Column({ unique: true })
  @IsNotEmpty()
  @Length(2, 30, { message: 'Может быть от 2 до 30 символов' })
  username: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Exclude()
  @Column()
  @IsNotEmpty()
  @MinLength(6, { message: 'Минимум 6 символов' })
  password: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsOptional()
  @MaxLength(200, { message: 'Максимум 200 символов' })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsFQDN()
  @IsOptional()
  avatar: string;

  @IsEmpty()
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @IsEmpty()
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @IsEmpty()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
}
