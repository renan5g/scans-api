import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CryptoService } from '@modules/global';
import { MessagesHelper } from '@common/helpers';

import { UsersRepository } from '@modules/users/repositories';
import { User } from '@modules/users/models';

import { LoginInput, RegisterInput } from '@modules/auth/dtos';
import { AuthPayload } from '@modules/auth/models';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser({ email, password }: LoginInput): Promise<AuthPayload> {
    const user = await this.usersRepository.getByEmail(email);

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
    const hashedPassword = await this.cryptoService.encrypt(input.password);

    const user = await this.usersRepository.create({
      password: hashedPassword,
      ...input,
    });

    if (!user) {
      throw new BadRequestException(MessagesHelper.CREATE_USER_FAILED);
    }

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
