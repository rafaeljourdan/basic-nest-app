import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './controller'
import { UserService } from './service'
import { UserRepository } from './repository'
import { UserSchema } from './schema'

@Module({
  imports: [
      MongooseModule.forFeature([
          { name: 'User', schema: UserSchema }
      ])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository]
})

export class UserModule {}
