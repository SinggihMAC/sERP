import { Module, DynamicModule } from '@nestjs/common';
import { PluginsService } from './plugins.service';

@Module({
  providers: [PluginsService],
  exports: [PluginsService],
})
export class PluginsModule {
  static register(): DynamicModule {
    return {
      module: PluginsModule,
      providers: [
        PluginsService,
      ],
      exports: [PluginsService],
    };
  }
}