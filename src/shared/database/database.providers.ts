import * as mongoose from 'mongoose'
import { Provider } from '@nestjs/common'

import { ConfigService } from './../config/config.service'

export const DatabaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose
        .connect(configService.get('MONGO_URL'), {
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true
        }),
    inject: [ConfigService]
  }
]
