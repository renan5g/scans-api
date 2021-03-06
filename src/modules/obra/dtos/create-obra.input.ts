import { ObraStatus } from '@common/types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateObraInput {
  @Field()
  title: string;
  cover?: string;
  sinopse?: string;
  demographic?: string;
  format?: string;
  author?: string[];
  artist?: string[];
  alternativesTitles?: string[];
  categoryIds?: string[];

  @Field(() => ObraStatus)
  status?: ObraStatus;
}
