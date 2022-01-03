import { Injectable } from '@nestjs/common';

import { PrismaService } from '@modules/prisma';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
}
