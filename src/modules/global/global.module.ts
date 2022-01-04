import { Global, Module, ModuleMetadata, Provider } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import * as Services from './services';

type ModuleType = NonNullable<ModuleMetadata['imports']>;

export const jwtModule = NestJwtModule.register({
  secret: process.env.SECRET_JWT,
  signOptions: {
    expiresIn: '7d',
    issuer: 'ACME',
    noTimestamp: false,
  },
});

const exposedModules: ModuleType = [jwtModule];
const exposedProviders: Provider[] = [...Object.values(Services)];

@Global()
@Module({
  imports: [...exposedModules],
  providers: [...exposedProviders],
  exports: [...exposedModules, ...exposedProviders],
})
export class GlobalModule {}
