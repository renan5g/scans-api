import { Injectable } from '@nestjs/common';

import { BaseRepositoryPrisma } from '@common/classes';
import { CreateUserInput, UpdateUserInput } from '../dtos';
import { User } from '../models';

@Injectable()
export class UsersRepository extends BaseRepositoryPrisma<User, 'user'> {
  constructor() {
    super(User, 'user');
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.exists({ email });
  }

  async getAll(): Promise<User[] | null> {
    const users = await this.prismaService.user.findMany();
    return this.formatMany(users);
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return this.format(user);
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.prismaService.user.create({ data: input });
    return this.format(user);
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: input,
    });
    return this.format(user);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prismaService.user.delete({
      where: { id },
    });
    return !!deleted;
  }
}
