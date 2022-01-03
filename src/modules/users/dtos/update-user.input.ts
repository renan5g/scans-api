import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, Min } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email?: string;

  @Min(6)
  @IsOptional()
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  avatar?: string;
}
