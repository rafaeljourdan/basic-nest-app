import { NestFactory } from '@nestjs/core'
import { ValidationPipe, ValidationError } from '@nestjs/common'
import { AppModule } from './app.module'
import { GlobalExceptionFilter, HttpExceptionFilter, ValidationFilter } from './shared/filters/'
import { ValidationException } from './shared/exception/validation.exception'

// import * as mongoose from 'mongoose'
// mongoose.set('useFindAndModify', false)

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api') // apply global prefix
  app.enableCors();
  
  // apply global filters in order (macro -> micro)
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  )

  // set ValidationPipe as a GlobalPipe
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false, // do not ignore any dto property
    exceptionFactory: (errors: ValidationError[]) => {
      const validationErrors = errors.map(error =>
        `${error.property} has wrong value ${error.value}: ${Object.values(error.constraints).join(', ')} `
      )
      // Errors are send to constructor that gonna throw ValidationException when validation errors happens
      return new ValidationException(validationErrors)
    }
  }))

  await app.listen(5000)
}
bootstrap()
