import { Module } from '@nestjs/common';

import { UsersService } from '@modules/users/services';
import { UsersResolver } from '@modules/users/resolvers';
import { UsersRepository } from '@modules/users/repositories';

@Module({
  providers: [UsersService, UsersResolver, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
