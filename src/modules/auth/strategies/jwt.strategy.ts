import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { MessagesHelper } from '@common/helpers';

import { JwtPayload } from '@modules/auth/models';
import { UsersRepository } from '@modules/users/repositories';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_JWT,
    });
  }

  async validate(payload: JwtPayload) {
    const user = this.userRepository.getById(payload.sub);

    if (!user) {
      throw new UnauthorizedException(MessagesHelper.UNAUTHORIZED);
    }
    return { userId: payload.sub, username: payload.name };
  }
}
