import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;
  username: string;
  password: string;
  avatar?: string;
}
