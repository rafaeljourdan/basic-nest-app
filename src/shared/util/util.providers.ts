import { Provider } from '@nestjs/common'

import { UtilService } from './util.service'

export const UtilProviders: Provider[] = [
  {
    provide: UtilService,
    useValue: new UtilService()
	}
]
