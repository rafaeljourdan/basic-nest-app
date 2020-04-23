import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/module'
import { UserModule } from './modules/user/module'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './modules/user/controller'
import { GetUserMiddleware } from './shared/middlewares/auth.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_CS,{ useNewUrlParser: true, useUnifiedTopology: true }),
    AuthModule,
    UserModule
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
