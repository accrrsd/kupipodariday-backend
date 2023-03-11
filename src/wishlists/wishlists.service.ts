import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { Wishlist } from './entities/wishlist.entity';

import {
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>,
  ) {}

  async findAll(): Promise<Wishlist[]> {
    return this.wishlistsRepository.find({ relations: ['items', 'owner'] });
  }

  async create(
    user: User,
    createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    const { itemsId, ...rest } = createWishlistDto;
    const wishes = itemsId.map((id: number) => ({ id } as Wish));
    const wishlist = this.wishlistsRepository.create({
      ...rest,
      owner: user,
      items: wishes,
    });
    return this.wishlistsRepository.save(wishlist);
  }

  async findOneById(id: number): Promise<Wishlist> {
    return this.wishlistsRepository.findOne({
      where: { id },
      relations: ['items', 'owner'],
    });
  }

  async update(user: User, id: number, updateWishlistDto: UpdateWishlistDto) {
    const currentWishlist = await this.findOneById(id);

    if (!currentWishlist) throw new NotFoundException('Не найдено');

    if (currentWishlist.owner.id !== user.id)
      throw new ForbiddenException('Ошибка доступа');

    const { itemsId, ...rest } = updateWishlistDto;
    const wishes = itemsId.map((id: number) => ({ id } as Wish));

    const updatingWishlist: Wishlist = {
      ...currentWishlist,
      ...rest,
      items: wishes,
      updatedAt: new Date(),
    };

    return this.wishlistsRepository.save(updatingWishlist);
  }

  async remove(id: number) {
    return this.wishlistsRepository.delete(id);
  }
}
