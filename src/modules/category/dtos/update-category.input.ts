import { InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCategoryInput {
  @IsString()
  @IsNotEmpty()
  name?: string;
}
