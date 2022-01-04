import { Entity } from '@common/classes';
import { Field, HideField, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends Entity {
  @Field()
  email: string;
  username: string;
  avatar?: string;
  @HideField()
  password: string;
}
