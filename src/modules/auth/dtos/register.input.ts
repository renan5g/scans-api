import { RegExHelper } from '@common/helpers';
import { InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';

@InputType()
export class RegisterInput {
  @IsString()
  @IsNotEmpty()
  @Matches(RegExHelper.USERNAME)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.PASSWORD)
  password: string;

  @IsNotEmpty()
  avatar?: string;
}
