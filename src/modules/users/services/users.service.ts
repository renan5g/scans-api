import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CryptService } from '@modules/global';

import { UsersRepository } from '@modules/users/repositories';
import { CreateUserInput, UpdateUserInput } from '@modules/users/dtos';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptService: CryptService,
  ) {}

  async index() {
    const result = await this.usersRepository.getAll();
    return result;
  }

  async show(id: string) {
    const result = await this.usersRepository.getById(id);

    if (!result) throw new NotFoundException('User does not exists');

    return result;
  }

  async store({ email, password, ...rest }: CreateUserInput) {
    const userAlreadyExists = await this.usersRepository.existsByEmail(email);

    if (userAlreadyExists) throw new BadRequestException('User already exists');

    const hashedPassword = await this.cryptService.encrypt(password);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    return user;
  }

  async update(id: string, input: UpdateUserInput) {
    const userAlreadyExists = await this.usersRepository.existsById(id);

    if (!userAlreadyExists) throw new NotFoundException('User does not exists');

    const user = await this.usersRepository.update(id, input);
    return user;
  }

  async delete(id: string) {
    const deleted = await this.usersRepository.delete(id);
    return deleted;
  }
}
