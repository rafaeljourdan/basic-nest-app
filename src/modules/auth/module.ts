import { Module } from '@nestjs/common'
import { AuthController } from './controller'
import { AuthService } from './service'
import { UserModule } from './../user/module'

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})

export class AuthModule {}