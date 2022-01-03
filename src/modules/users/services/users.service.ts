import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@modules/users/repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
}
