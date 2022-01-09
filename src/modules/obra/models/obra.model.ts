import { Entity } from '@common/classes';
import { Category } from '@modules/category/models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Obra extends Entity {
  @Field()
  title: string;
  cover?: string;
  sinopse?: string;
  demographic?: string;
  format?: string;
  author?: string[];
  artist?: string[];
  status: string;
  alternativesTitles?: string[];

  @Field(() => [Category])
  categories?: Category[];
}
