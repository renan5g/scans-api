import { Injectable } from '@nestjs/common';

import { PrismaService, Prisma } from '@modules/prisma';
import { CreateUserInput, FilterInput, UpdateUserInput } from '../dtos';
import { User } from '../models';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existsByEmail(email: string): Promise<boolean> {
    return await this.exists({ email });
  }

  async existsByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<boolean> {
    const existsEmail = await this.exists({ email });
    const existsUsername = await this.exists({ username });

    if (existsEmail || existsUsername) return true;

    return false;
  }

  async existsById(id: string): Promise<boolean> {
    return await this.exists({ id });
  }

  async getAll({
    orderBy,
    page = 1,
    perPage = 20,
    search,
  }: FilterInput): Promise<User[] | null> {
    const or = search
      ? {
          OR: [
            { email: { contains: search } },
            { username: { contains: search } },
          ],
        }
      : {};

    const users = await this.prismaService.user.findMany({
      where: {
        ...or,
      },
      take: perPage,
      skip: perPage * (page - 1),
      orderBy: {
        updatedAt: orderBy,
      },
    });

    return users;
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.get({ email });
  }

  async getByEmailOrUsername(input: string): Promise<User | null> {
    const userByEmail = await this.get({ email: input });

    if (userByEmail) return userByEmail;

    const userByUsername = await this.get({ username: input });
    return userByUsername;
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

  async exists(where?: Prisma.UserWhereUniqueInput): Promise<boolean> {
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
