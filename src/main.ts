import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'

import { ValidationPipeOptions } from './shared/pipe/validationPipe.options'
import { AppModule } from './app.module'
import { GlobalExceptionFilter, HttpExceptionFilter, ValidationFilter } from './shared/filters/'
import { RolesGuard } from './shared/guards/roles.guard'
import config from './shared/contants'

let instance = null
const getNestInstance = async (): Promise<any> =>
	(!instance)
		? (instance = await NestFactory.create(AppModule))
		: instance

async function bootstrap(): Promise<void> {
  const app = await getNestInstance()

  app.setGlobalPrefix(config['API_PREFIX'])
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
  await app.listen(config['API_PORT'])

	const apiUrl: string = await app.getUrl()
  console.log(`Application is running on: ${apiUrl}`)
}

bootstrap()
