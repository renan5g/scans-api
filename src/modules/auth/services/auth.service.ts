import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CryptoService } from '@modules/global';
import { MessagesHelper } from '@common/helpers';

import { User } from '@modules/users/models';
import { UsersService } from '@modules/users/services';

import { LoginInput, RegisterInput } from '@modules/auth/dtos';
import { AuthPayload } from '@modules/auth/models';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser({
    emailOrUsername,
    password,
  }: LoginInput): Promise<AuthPayload> {
    const user = await this.usersService.showByEmailOrUsername(emailOrUsername);

    const validPassword = await this.cryptoService.compare(
      password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException(MessagesHelper.PASSWORD_OR_EMAIL_INVALID);
    }

    const token = await this.createJwtToken(user);

    return {
      user,
      token,
    };
  }

  async registerUser(input: RegisterInput): Promise<AuthPayload> {
    const user = await this.usersService.store(input);

    const token = await this.createJwtToken(user);

    return {
      user,
      token,
    };
  }

  private async createJwtToken(user: User): Promise<string> {
    const payload = {
      name: user.username,
      sub: user.id,
    };
    return await this.jwtService.signAsync(payload);
  }
}
