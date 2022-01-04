import { Resolver } from '@nestjs/graphql';
import { AuthService } from '@modules/auth/services';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}
}
