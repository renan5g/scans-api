import { Injectable } from '@nestjs/common';
import { PrismaService, Prisma } from '@modules/prisma';
import { Category } from '../models';
import { CreateCategoryInput, UpdateCategoryInput } from '../dtos';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existsById(id: string): Promise<boolean> {
    return await this.exists({ id });
  }

  async existsByName(name: string): Promise<boolean> {
    return await this.exists({ name });
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.prismaService.category.findMany({
      include: {
        obras: true,
      },
    });

    return categories;
  }

  async getById(id: string): Promise<Category | null> {
    return await this.get({ id });
  }

  async create(input: CreateCategoryInput): Promise<Category> {
    const category = await this.prismaService.category.create({ data: input });
    return category;
  }

  async update(id: string, input: UpdateCategoryInput): Promise<Category> {
    const category = await this.prismaService.category.update({
      where: { id },
      data: input,
    });
    return category;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.prismaService.category.delete({
      where: { id },
    });
    return !!deleted;
  }

  private async exists(where?: Prisma.CategoryWhereInput): Promise<boolean> {
    const count = await this.prismaService.category.count({
      where,
    });
    return count > 0;
  }

  private async get(
    where?: Prisma.CategoryWhereUniqueInput,
  ): Promise<Category> {
    const result = await this.prismaService.category.findUnique({
      where,
    });
    return result;
  }
}
