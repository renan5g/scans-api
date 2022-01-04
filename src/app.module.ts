import { join } from 'path';
import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from '@modules/prisma';
import { AuthModule } from '@modules/auth';
import { UsersModule } from '@modules/users';
import { GlobalModule } from '@modules/global';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    UsersModule,
    GlobalModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
