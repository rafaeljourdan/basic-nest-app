import { ValidationError } from 'class-validator'
import { ValidationException } from './../exception/validation.exception'

export class ValidationPipeOptions {
    private static validationOptions: object = {
        skipMissingProperties: false, // to not ignore any dto property
        exceptionFactory: (errors: ValidationError[]) => {
            const validationErrors = errors.map(error =>
                `${error.property} has wrong value ${error.value}: ${Object.values(error.constraints).join(', ')} `
            )
            // The errors are send to ValidationException constructor that's going to throw ValidationException
            // The exception is going to catch by validation.filter (configured globally)
            return new ValidationException(validationErrors)
        }
    }
    
    static get options(): object {
        return this.validationOptions
    }
}