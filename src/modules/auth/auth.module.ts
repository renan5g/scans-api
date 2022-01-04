import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@modules/users';
import { AuthResolver } from '@modules/auth/resolvers';
import { AuthService } from '@modules/auth/services';
import { JwtStrategy } from '@modules/auth/strategies';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
