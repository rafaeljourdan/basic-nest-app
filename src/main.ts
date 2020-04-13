import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './shared/filters/http.filter'
import { GlobalExceptionFilter } from './shared/filters/global.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // apply global prefix
  app.setGlobalPrefix('api')
  
  // apply global filters (global and http error handlers)
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new HttpExceptionFilter()
  )

  await app.listen(5000)
}
bootstrap()
