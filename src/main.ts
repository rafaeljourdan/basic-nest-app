import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe, ValidationError } from '@nestjs/common'
import { AppModule } from './app.module'
import { GlobalExceptionFilter, HttpExceptionFilter, ValidationFilter } from './shared/filters/'
import { ValidationException } from './shared/exception/validation.exception'
import { RolesGuard } from './shared/guards/roles.guard'

// import * as mongoose from 'mongoose'
// mongoose.set('useFindAndModify', false)

let instance = null
const getNestInstance = async () => (!instance)
  ? await NestFactory.create(AppModule)
  : instance

async function bootstrap() {
  const app = await getNestInstance()

  app.setGlobalPrefix(process.env.API_PREFIX)
  app.enableCors()
  
  // Global filters (in order: macro -> micro)
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  )

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe({ // set ValidationPipe as a GlobalPipe
    skipMissingProperties: false, // do not ignore any dto property
    exceptionFactory: (errors: ValidationError[]) => {
      const validationErrors = errors.map(error =>
        `${error.property} has wrong value ${error.value}: ${Object.values(error.constraints).join(', ')} `
      )
      // Errors are send to constructor that gonna throw ValidationException when validation errors happens
      return new ValidationException(validationErrors)
    }
  }))

  // Global Guards
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new RolesGuard(reflector))

  // Start API
  await app.listen(process.env.API_PORT)

  console.log(`Application is running on: ${ await app.getUrl() }`)
}
bootstrap()
