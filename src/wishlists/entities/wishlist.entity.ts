import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { baseEntity } from '../../utils/baseEntity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Wishlist extends baseEntity {
  @Column()
  @IsNotEmpty()
  @Length(1, 250, { message: 'Может быть от 1 до 30 символов' })
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(1500, { message: 'Максимум 1500 символов' })
  description: string;

  @ManyToMany(() => Wish)
  @JoinTable()
  @IsOptional()
  items: Wish[];

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
