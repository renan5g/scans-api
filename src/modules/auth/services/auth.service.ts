import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@modules/users/repositories';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
}
