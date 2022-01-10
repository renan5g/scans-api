import { PaginationInput } from '@common/classes';
import { ObraStatus } from '@common/types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterObraInput extends PaginationInput {
  categories?: string[];
  format?: string;

  @Field(() => ObraStatus)
  status?: ObraStatus;
}
