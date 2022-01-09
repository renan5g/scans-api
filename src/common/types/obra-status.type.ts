import { registerEnumType } from '@nestjs/graphql';

export enum ObraStatus {
  ativo,
  completo,
  cancelado,
  hiato,
}

registerEnumType(ObraStatus, {
  name: 'ObraStatus',
});
