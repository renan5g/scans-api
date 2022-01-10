import { PaginationInput } from '@common/classes';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateObraInput, UpdateObraInput } from '../dtos';
import { ObraRepository } from '../repositories';

@Injectable()
export class ObraService {
  constructor(private readonly obraRepository: ObraRepository) {}

  async index(filters?: PaginationInput) {
    const categories = await this.obraRepository.getAll(filters);

    console.log(filters);
    return categories;
  }

  async show(id: string) {
    const obra = await this.obraRepository.getById(id);

    if (!obra) {
      throw new NotFoundException('Category does not exists!');
    }

    return obra;
  }

  async store(input: CreateObraInput) {
    const categoryAlreadyExists = await this.obraRepository.existsByTitle(
      input.title,
    );

    if (categoryAlreadyExists) {
      throw new ConflictException('Category already exists!');
    }

    const obra = await this.obraRepository.create(input);
    return obra;
  }

  async update(id: string, input: UpdateObraInput) {
    const obraAlreadyExists = await this.obraRepository.existsById(id);

    if (!obraAlreadyExists) {
      throw new NotFoundException('obra does not exists!');
    }

    const obra = await this.obraRepository.update(id, input);
    return obra;
  }

  async delete(id: string) {
    const deleted = await this.obraRepository.delete(id);
    return deleted;
  }
}
