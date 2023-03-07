import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { hash } from '../utils/functions';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findMany(user): Promise<User[]> {
    return await this.userRepository.find({
      where: [{ email: user.query }, { username: user.query }],
    });
  }

  async update(id: number, user: UpdateUserDto) {
    if (user.password) {
      const newPassword = await hash(user.password, 10);
      return this.userRepository.update(id, {
        ...user,
        password: newPassword,
      });
    }
    return this.userRepository.update(id, user);
  }

  async removeById(id: number) {
    return this.userRepository.delete({ id });
  }
}
