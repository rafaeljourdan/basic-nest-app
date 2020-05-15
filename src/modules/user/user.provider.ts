import { Provider } from '@nestjs/common'
import { Connection } from 'mongoose'

import { UserSchema } from './user.schema'

const UserProvider: Provider[] = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection): Promise<Connection> => 
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION']
  }
]

export default UserProvider
