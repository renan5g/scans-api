import { Injectable } from '@nestjs/common';

import { PrismaService, Prisma } from '@modules/prisma';
import { PaginationInput } from '@common/classes';

import { Obra } from '../models';
import { CreateObraInput, UpdateObraInput } from '../dtos';

@Injectable()
export class ObraRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existsById(id: string): Promise<boolean> {
    return await this.exists({ id });
  }

  async existsByTitle(title: string): Promise<boolean> {
    return await this.exists({ title });
  }

  async getAll({
    orderBy = 'desc',
    page = 1,
    perPage = 20,
    search,
  }: PaginationInput): Promise<Obra[]> {
    const or = search
      ? {
          OR: [
            { title: { contains: search } },
            { alternativesTitles: { hasSome: search } },
          ],
        }
      : {};

    const result = await this.prismaService.obra.findMany({
      orderBy: {
        updatedAt: orderBy,
      },
      take: perPage,
      skip: perPage * (page - 1),
      where: {
        ...or,
      },
      include: {
        categories: true,
      },
    });

    return result;
  }

  async getById(id: string): Promise<Obra | null> {
    return await this.get({ id });
  }

  async create({ categoryIds, ...rest }: CreateObraInput): Promise<Obra> {
    const categories = categoryIds?.map((category) => ({
      id: category,
    }));

    const obra = await this.prismaService.obra.create({
      data: {
        ...rest,
        categories: {
          connect: categories,
        },
      },
      include: {
        categories: true,
      },
    });
    return obra;
  }

  async update(
    id: string,
    { categoryIds, ...rest }: UpdateObraInput,
  ): Promise<Obra> {
    const categories = categoryIds?.map((category) => ({
      id: category,
    }));

    const obra = await this.prismaService.obra.update({
      where: { id },
      data: {
        ...rest,
        categories: {
          connect: categories,
        },
      },
      include: {
        categories: true,
      },
    });
    return obra;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prismaService.obra.delete({
      where: { id },
    });
    return !!deleted;
  }

  private async exists(where?: Prisma.ObraWhereInput): Promise<boolean> {
    const count = await this.prismaService.obra.count({
      where,
    });
    return count > 0;
  }

  private async get(where?: Prisma.ObraWhereUniqueInput): Promise<Obra> {
    const result = await this.prismaService.obra.findUnique({
      where,
    });
    return result;
  }
}
