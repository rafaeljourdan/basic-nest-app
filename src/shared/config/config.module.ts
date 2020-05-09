import { Global, Module } from '@nestjs/common'

import { ConfigProviders } from './config.providers'
import { ConfigService } from './config.service'

@Global()
@Module({
  providers: [...ConfigProviders],
  exports: [ConfigService]
})

export class ConfigModule {}
