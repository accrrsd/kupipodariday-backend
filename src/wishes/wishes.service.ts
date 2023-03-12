import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Wish } from './entities/wish.entity';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  private wishRepository: any;
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async findManyByOwner(ownerId: number): Promise<Wish[]> {
    return this.wishesRepository.find({
      where: { owner: { id: ownerId } },
      order: { updatedAt: 'DESC' },
      relations: ['offers', 'owner'],
    });
  }

  async findTopWishes(): Promise<Wish[]> {
    return this.wishesRepository.find({
      order: { createdAt: 1 },
      take: 1,
      relations: ['owner', 'offers'],
    });
  }

  async findLastWishes(): Promise<Wish[]> {
    return this.wishesRepository.find({
      order: { createdAt: -1 },
      take: 1,
      relations: ['owner', 'offers'],
    });
  }

  async copy(id: number) {
    const wish = await this.wishesRepository.findOneBy({ id });
    if (!wish) throw new NotFoundException('Подарок не найден');

    await this.wishesRepository.update(id, {
      copied: (wish.copied += 1),
    });

    const { createdAt, updatedAt, id: junkId, ...restWish } = wish;

    const wishCopy = {
      ...restWish,
      copied: 0,
      raised: 0,
      offers: [],
    };

    return await this.create(wish.owner, wishCopy);
  }

  async create(user: User, createWishDto: CreateWishDto) {
    return await this.wishesRepository.save({
      ...createWishDto,
      owner: user,
    });
  }

  async findOneById(id: number) {
    const wish = await this.wishesRepository.findOne({
      relations: {
        owner: { wishes: true, wishlists: true, offers: true },
        offers: { user: true },
      },
      where: { id },
    });

    if (!wish) throw new NotFoundException('Подарок не найден');
    return wish;
  }

  findAll() {
    return this.wishesRepository.find();
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return this.wishesRepository.update(id, updateWishDto);
  }

  remove(id: number) {
    return this.wishesRepository.delete({ id });
  }

  async findManyByIds(createWishlistDto) {
    return await this.wishRepository.find({
      where: { id: In(createWishlistDto.itemsId || []) },
    });
  }
}
