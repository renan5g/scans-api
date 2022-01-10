import { PaginationInput } from '@common/classes';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryInput, UpdateCategoryInput } from '../dtos';
import { CategoryRepository } from '../repositories';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async index(filters?: PaginationInput) {
    const categories = await this.categoryRepository.getAll();
    return categories;
  }

  async show(id: string) {
    const category = await this.categoryRepository.getById(id);

    if (!category) {
      throw new NotFoundException('Category does not exists!');
    }

    return category;
  }

  async store({ name }: CreateCategoryInput) {
    const categoryAlreadyExists = await this.categoryRepository.existsByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new NotAcceptableException('Category already exists!');
    }

    const category = await this.categoryRepository.create({ name });
    return category;
  }

  async update(id: string, { name }: UpdateCategoryInput) {
    const categoryAlreadyExists = await this.categoryRepository.existsById(id);

    if (categoryAlreadyExists) {
      throw new NotFoundException('Category does not exists!');
    }

    const category = await this.categoryRepository.create({ name });
    return category;
  }

  async delete(id: string) {
    const deleted = await this.categoryRepository.delete(id);
    return deleted;
  }
}
