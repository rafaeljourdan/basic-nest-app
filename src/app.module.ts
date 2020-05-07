import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './modules/auth/module'
import { UserModule } from './modules/user/module'
import { UserController } from './modules/user/controller'
import { AuthMiddleware } from './shared/middlewares/auth.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // package internally uses dotenv
    MongooseModule.forRoot(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: []
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path:`${process.env.API_PREFIX}/users/example/open_route`, // public route
          method: RequestMethod.GET
        }
      )
      .forRoutes(UserController)
  }
}
