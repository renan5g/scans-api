import { Entity } from '@common/classes';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends Entity {
  email: string;
  username: string;
  avatar?: string;
}
