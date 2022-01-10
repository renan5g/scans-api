import { Field, InputType } from '@nestjs/graphql';
import { ObraStatus } from '@common/types';

@InputType()
export class UpdateObraInput {
  @Field()
  title?: string;
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
