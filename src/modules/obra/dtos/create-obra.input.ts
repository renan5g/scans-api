import { Category } from '@modules/category/models';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
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
  status: 'ativo' | 'completo' | 'cancelado' | 'hiato';

  @Field(() => [Category])
  categories?: Category[];
}
