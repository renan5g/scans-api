import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

import { GqlAuthGuard } from '@common/guards';

import { CreateCategoryInput, UpdateCategoryInput } from '../dtos';
import { Category } from '../models';
import { CategoryService } from '../services';

@Resolver('Category')
@UseGuards(GqlAuthGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async allCategories(): Promise<Category[]> {
    const response = await this.categoryService.index();
    return response;
  }

  @Query(() => Category)
  async showCategory(
    @Args('id', new ParseUUIDPipe()) id: string,
  ): Promise<Category> {
    const response = await this.categoryService.show(id);
    return response;
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('input') input: CreateCategoryInput,
  ): Promise<Category> {
    const response = await this.categoryService.store(input);
    return response;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id', new ParseUUIDPipe()) id: string,
    @Args('input') input: UpdateCategoryInput,
  ): Promise<Category> {
    const response = await this.categoryService.update(id, input);
    return response;
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Args('input', new ParseUUIDPipe()) id: string,
  ): Promise<boolean> {
    const response = await this.categoryService.delete(id);
    return response;
  }
}
