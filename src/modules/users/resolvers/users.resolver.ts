import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '@modules/users/models';
import { UsersService } from '@modules/users/services';
import { CreateUserInput, UpdateUserInput } from '@modules/users/dtos';

@Resolver('users')
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    const result = await this.usersService.index();
    return result;
  }

  @Query(() => User)
  async showUser(@Args('id') id: string): Promise<User> {
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
    @Args('id') id: string,
    @Args('input') input: UpdateUserInput,
  ): Promise<User> {
    const result = await this.usersService.update(id, input);
    return result;
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    const result = await this.usersService.delete(id);
    return result;
  }
}
