import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from '@modules/prisma';
import { UsersModule } from '@modules/users';
import { GlobalModule } from '@modules/global';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
    UsersModule,
    GlobalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
