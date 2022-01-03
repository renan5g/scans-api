import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, Min } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Min(6)
  @IsOptional()
  username?: string;

  avatar?: string;
}
