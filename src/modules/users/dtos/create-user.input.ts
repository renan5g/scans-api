import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @IsString()
  @Min(6)
  username: string;

  @IsString()
  @Min(8)
  password: string;

  avatar?: string;
}
