import { Injectable } from '@nestjs/common';

import { PrismaService, Prisma } from '@modules/prisma';
import { CreateUserInput, UpdateUserInput } from '../dtos';
import { User } from '../models';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existsByEmail(email: string): Promise<boolean> {
    return await this.exists({ email });
  }

  async existsById(id: string): Promise<boolean> {
    return await this.exists({ id });
  }

  async getAll(): Promise<User[] | null> {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.get({ email });
  }

  async getById(id: string): Promise<User | null> {
    return await this.get({ id });
  }

  async create(input: CreateUserInput): Promise<User> {
    const user = await this.prismaService.user.create({ data: input });
    return user;
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.prismaService.user.update({
      where: { id },
      data: input,
    });
    return user;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prismaService.user.delete({
      where: { id },
    });
    return !!deleted;
  }

  private async exists(where?: Prisma.UserWhereUniqueInput): Promise<boolean> {
    const count = await this.prismaService.user.count({
      where,
    });
    return count > 0;
  }

  private async get(where?: Prisma.UserWhereUniqueInput): Promise<User> {
    const result = await this.prismaService.user.findUnique({
      where,
    });
    return result;
  }
}
