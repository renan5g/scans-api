import { registerEnumType } from '@nestjs/graphql';

export enum ObraStatus {
  ativo = 'ativo',
  completo = 'completo',
  cancelado = 'cancelado',
  hiato = 'hiato',
}

registerEnumType(ObraStatus, {
  name: 'ObraStatus',
});
