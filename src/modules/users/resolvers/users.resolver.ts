import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { GqlAuthGuard } from '@common/guards';
import { AuthUser } from '@common/decorators';
import { ContextUser } from '@common/types';

import { User } from '@modules/users/models';
import { UsersService } from '@modules/users/services';
import { CreateUserInput, UpdateUserInput } from '@modules/users/dtos';
import { FilterInput } from '@common/types';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async me(@AuthUser() { userId }: ContextUser) {
    const result = await this.usersService.show(userId);
    return result;
  }

  @Query(() => [User])
  async allUsers(@Args('filter') filter?: FilterInput): Promise<User[]> {
    const result = await this.usersService.index(filter);
    return result;
  }

  @Query(() => User)
  async showUser(@Args('id', new ParseUUIDPipe()) id: string): Promise<User> {
    const result = await this.usersService.show(id);
    return result;
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    const result = await this.usersService.store(input);
    return result;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', new ParseUUIDPipe()) id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    const result = await this.usersService.update(id, input);
    return result;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', new ParseUUIDPipe()) id: string,
  ): Promise<boolean> {
    const result = await this.usersService.delete(id);
    return result;
  }
}
