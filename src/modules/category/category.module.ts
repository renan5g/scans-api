import { Module } from '@nestjs/common';
import { CategoryService } from '@modules/category/services';
import { CategoryResolver } from '@modules/category/resolvers';

@Module({
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
