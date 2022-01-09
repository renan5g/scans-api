import { Entity } from '@common/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { Obra } from '@modules/obra/models';

@ObjectType()
export class Category extends Entity {
  @Field()
  name: string;
  obras?: Obra[];
}
