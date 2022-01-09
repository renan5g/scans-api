import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field()
  search?: string;
  @Field()
  perPage?: number;
  @Field()
  page?: number;
  @Field()
  orderBy?: 'asc' | 'desc';
}
