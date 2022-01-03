import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  email?: string;
  username?: string;
  avatar?: string;
}
