import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma';
import { UsersModule } from '@modules/users';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
