import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from '@modules/auth/services';
import { LoginInput, RegisterInput } from '@modules/auth/dtos';
import { AuthPayload } from '@modules/auth/models';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
    const result = await this.authService.loginUser(input);
    return result;
  }

  @Mutation(() => AuthPayload)
  async register(@Args('input') input: RegisterInput): Promise<AuthPayload> {
    const result = await this.authService.registerUser(input);
    return result;
  }
}
