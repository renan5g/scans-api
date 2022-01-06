import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CryptoService } from '@modules/global';

import { UsersRepository } from '@modules/users/repositories';
import {
  CreateUserInput,
  UpdateUserInput,
  FilterInput,
} from '@modules/users/dtos';
import { MessagesHelper } from '@common/helpers';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async index(filter: FilterInput) {
    const result = await this.usersRepository.getAll(filter);
    return result;
  }

  async show(id: string) {
    const result = await this.usersRepository.getById(id);

    if (!result) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }

    return result;
  }

  async showByEmailOrUsername(emailOrUsername: string) {
    const result = await this.usersRepository.getByEmailOrUsername(
      emailOrUsername,
    );

    if (!result) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }

    return result;
  }

  async store({ email, password, username, avatar }: CreateUserInput) {
    const userAlreadyExists =
      await this.usersRepository.existsByEmailOrUsername(email, username);

    if (userAlreadyExists) {
      throw new BadRequestException(MessagesHelper.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this.cryptoService.encrypt(password);

    const user = await this.usersRepository.create({
      email,
      password: hashedPassword,
      username,
      avatar,
    });

    if (!user) {
      throw new BadRequestException(MessagesHelper.CREATE_USER_FAILED);
    }

    return user;
  }

  async update(id: string, input: UpdateUserInput) {
    const userAlreadyExists = await this.usersRepository.existsById(id);

    if (!userAlreadyExists) {
      throw new NotFoundException(MessagesHelper.USER_NOT_FOUND);
    }

    const user = await this.usersRepository.update(id, input);
    return user;
  }

  async delete(id: string) {
    const deleted = await this.usersRepository.delete(id);
    return deleted;
  }
}
