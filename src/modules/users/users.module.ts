import { Module } from '@nestjs/common';

import { UsersService } from '@modules/users/services';
import { UsersResolver } from '@modules/users/resolvers';

@Module({
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
