import { PaginationInput } from '@common/classes';
import { ObraStatus } from '@common/types';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FilterObraInput extends PaginationInput {
  categories: string[];
  format: string;

  @Field(() => ObraStatus)
  status: ObraStatus;
}
