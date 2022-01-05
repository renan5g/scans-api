import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterInput {
  @Field()
  search?: string;
  @Field()
  perPage?: number;
  @Field()
  page?: number;
  @Field()
  orderBy?: 'asc' | 'desc';
}
