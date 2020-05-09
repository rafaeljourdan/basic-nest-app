import { Module } from '@nestjs/common'

import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { UserProvider } from './user.provider'

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, ...UserProvider],
  exports: [UserService]
})

export class UserModule {}
