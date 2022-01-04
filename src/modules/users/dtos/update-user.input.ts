import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, Matches, Min } from 'class-validator';
import { RegExHelper } from '@common/helpers';

@InputType()
export class UpdateUserInput {
  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(RegExHelper.USERNAME)
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  avatar?: string;
}
