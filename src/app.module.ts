import { Module } from '@nestjs/common'
import { AuthModule } from './auth/module'
import { UserModule } from './user/module'
import { MongooseModule } from '@nestjs/mongoose'
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
export class AppModule {}
