import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { ValidationException } from './../exception/validation.exception'

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {

    catch(exception: ValidationException, host: ArgumentsHost): any {
        console.log('Validation exception handler was triggered', exception)

        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const status = 400

        return response
            .status(status)
            .json({
                status,
                createdBy: 'ValidationFilter',
                errorMessage: exception.validationErrors
            })

    }

}