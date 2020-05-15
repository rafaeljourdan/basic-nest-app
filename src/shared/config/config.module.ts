import { Global, Module } from '@nestjs/common'

import { ConfigProviders } from './config.providers'

@Global()
@Module({
  providers: [...ConfigProviders],
  exports: [...ConfigProviders]
})

export class ConfigModule {}
