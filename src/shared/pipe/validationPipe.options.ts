import { ValidationError } from "class-validator"
import { ValidationException } from "../exception/validation.exception"

export class ValidationPipeOptions {
    private static validationOptions: any = {
        skipMissingProperties: false, // do not ignore any dto property
        exceptionFactory: (errors: ValidationError[]) => {
            const validationErrors = errors.map(error =>
                `${error.property} has wrong value ${error.value}: ${Object.values(error.constraints).join(', ')} `
            )
            // Errors are send to constructor that gonna throw ValidationException when ocorrers validation errors
            return new ValidationException(validationErrors)
        }
    }
    
    static get options(): object {
        return this.validationOptions
    }
}