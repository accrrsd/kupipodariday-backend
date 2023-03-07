import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';

import { WishesService } from '../wishes/wishes.service';

import { CreateOfferDto } from './dto/create-offer.dto';

import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async findOneById(id: number): Promise<Offer> {
    return this.offersRepository.findOne({
      where: { id },
      relations: ['item', 'user'],
    });
  }

  async findAll(): Promise<Offer[]> {
    return this.offersRepository.find({ relations: ['item', 'user'] });
  }

  async create(user: User, createOfferDto: CreateOfferDto) {
    const wishes = await this.wishesService.findOneById(createOfferDto.itemId);

    if (createOfferDto.amount > wishes.price - wishes.raised)
      throw new BadRequestException(
        'Сумма средств не должна превышать стоимость подарка',
      );
    else if (createOfferDto.amount < 0)
      throw new BadRequestException('Не может быть 0');
    else if (user.id === wishes.owner.id)
      throw new BadRequestException('Нельзя дарить самому себе');

    await this.wishesService.update(createOfferDto.itemId, {
      raised: wishes.raised + createOfferDto.amount,
    });

    const wish = await this.wishesService.findOneById(wishes.id);
    return this.offersRepository.save({ ...createOfferDto, user, item: wish });
  }
}
