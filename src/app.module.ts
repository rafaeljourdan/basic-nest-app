import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'

import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { UserController } from './modules/user/user.controller'
import { AuthMiddleware } from './shared/middlewares/auth.middleware'
import { ConfigModule } from './shared/config/config.module'
import { DatabaseModule } from './shared/database/database.module'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
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
