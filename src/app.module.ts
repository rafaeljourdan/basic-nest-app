import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { AuthModule } from './modules/auth/module'
import { UserModule } from './modules/user/module'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './modules/user/controller'
import { GetUserMiddleware } from './shared/middlewares/auth.middleware'
const MongoCS_temp = "mongodb+srv://inspetoruser:appInspec12@cluster0-khfyc.mongodb.net/inspetor?retryWrites=true&w=majority"

@Module({
  imports: [
    AuthModule, 
    UserModule,
    MongooseModule.forRoot(MongoCS_temp)
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(UserController)
  }
}
