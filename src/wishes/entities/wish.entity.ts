import {
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
} from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { baseEntity } from '../../utils/baseEntity';

import { Offer } from '../../offers/entities/offer.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wish extends baseEntity {
  @Column()
  @IsNotEmpty()
  @Length(1, 250, { message: 'От 1 до 250 символов' })
  name: string;

  @Column({ scale: 2 })
  @IsNotEmpty()
  price: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 1024, { message: 'От 1 до 1024 символов' })
  description: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @Column({ scale: 2, nullable: true })
  @IsOptional()
  raised: number;

  @OneToMany(() => Offer, (offer) => offer.item)
  @IsEmpty()
  offers: Offer[];

  @ManyToOne(() => User, (user) => user.wishes)
  @JoinColumn()
  @IsNotEmpty()
  owner: User;

  @Column({ default: 0, nullable: true })
  @IsInt()
  copied: number;
}
