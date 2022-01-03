import { ObjectType } from '@nestjs/graphql';
import { FieldId } from '@common/decorators';

@ObjectType()
export class Entity {
  @FieldId()
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
