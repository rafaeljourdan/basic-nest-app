import { Global, Module } from '@nestjs/common'

import { UtilProviders } from './util.providers'

@Global()
@Module({
  providers: [ ...UtilProviders ],
  exports: [ ...UtilProviders ]
})

export class UtilModule {}
