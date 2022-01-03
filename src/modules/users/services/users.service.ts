import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '@modules/users/repositories';
import { CreateUserInput, UpdateUserInput } from '../dtos';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async index() {
    const result = await this.usersRepository.getAll();
    return result;
  }

  async show(id: string) {
    const result = await this.usersRepository.getById(id);

    if (!!result) throw new NotFoundException('User already exists');

    return result;
  }

  async store({ email, password, ...rest }: CreateUserInput) {
    const userAlreadyExists = await this.usersRepository.existsByEmail(email);

    if (userAlreadyExists) throw new BadRequestException('User already exists');

    const user = await this.usersRepository.create({
      email,
      password,
      ...rest,
    });
    return user;
  }

  async update(id: string, input: UpdateUserInput) {
    const userAlreadyExists = await this.usersRepository.existsById(id);

    if (userAlreadyExists === false)
      throw new NotFoundException('User does not exists');

    const user = await this.usersRepository.update(id, input);
    return user;
  }

  async delete(id: string) {
    const deleted = await this.usersRepository.delete(id);
    return deleted;
  }
}
