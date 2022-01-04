import { User } from '@modules/users/models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field(() => User)
  user: User;

  token: string;
}
