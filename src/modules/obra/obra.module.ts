import { Module } from '@nestjs/common';
import { ObraRepository } from './repositories';
import { ObraResolver } from './resolvers';
import { ObraService } from './services';

@Module({
  providers: [ObraRepository, ObraService, ObraResolver],
})
export class ObraModule {}
