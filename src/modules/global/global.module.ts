import { Global, Module, ModuleMetadata, Provider } from '@nestjs/common';
import * as Services from './services';

type ModuleType = NonNullable<ModuleMetadata['imports']>;

const exposedModules: ModuleType = [];
const exposedProviders: Provider[] = [...Object.values(Services)];

@Global()
@Module({
  imports: [...exposedModules],
  providers: [...exposedProviders],
  exports: [...exposedModules, ...exposedProviders],
})
export class GlobalModule {}
