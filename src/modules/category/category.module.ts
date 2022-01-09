import { Module } from '@nestjs/common';
import { CategoryService } from '@modules/category/services';
import { CategoryResolver } from '@modules/category/resolvers';
import { CategoryRepository } from '@modules/category/repositories';

@Module({
  providers: [CategoryService, CategoryResolver, CategoryRepository],
})
export class CategoryModule {}
