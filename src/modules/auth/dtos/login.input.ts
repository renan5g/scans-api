import { InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  emailOrUsername: string;
  password: string;
}
