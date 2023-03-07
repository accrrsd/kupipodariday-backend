import { IsBoolean, IsNotEmpty, NotEquals } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { baseEntity } from '../../utils/baseEntity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Offer extends baseEntity {
  @ManyToOne(() => Wish, (wish) => wish.offers)
  @IsNotEmpty()
  item: Wish;

  @Column({ scale: 2 })
  @IsNotEmpty()
  @NotEquals(0)
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.offers)
  @IsNotEmpty()
  user: User;
}
