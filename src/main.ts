import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'
dotenv.config()

import { ValidationPipeOptions } from './shared/pipe/validationPipe.options'
import { AppModule } from './app.module'
import { GlobalExceptionFilter, HttpExceptionFilter, ValidationFilter } from './shared/filters/'
import { RolesGuard } from './shared/guards/roles.guard'
import { ConfigService } from './shared/config/config.service'

let instance = null
const getNestInstance = async () => (!instance)
  ? await NestFactory.create(AppModule)
  : instance

async function bootstrap() {
  const app = await getNestInstance()

  const configService = new ConfigService()
  console.log('get API_PREFIX', configService.get('API_PREFIX'))

  app.setGlobalPrefix(process.env.API_PREFIX)
  app.enableCors()
  
  // Global filters (in order: macro -> micro)
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  )

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe(ValidationPipeOptions.options)) // set ValidationPipe as a global pipe

  // Global Guards
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new RolesGuard(reflector))

  // Start API
  await app.listen(process.env.API_PORT)

  console.log(`Application is running on: ${ await app.getUrl() }`)
}

bootstrap()
