import { Provider } from '@nestjs/common'

import { ConfigService } from './config.service'

export const ConfigProviders: Provider[] = [
  {
    provide: ConfigService,
    useValue: new ConfigService()
  }
]
