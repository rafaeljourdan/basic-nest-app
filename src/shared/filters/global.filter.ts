import { ArgumentsHost, ExceptionFilter, Catch } from "@nestjs/common";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    
    catch(exception: any, host: ArgumentsHost) {
        console.log('Global exception handler was triggered')
        
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const status = 500
        
        return response.status(status).json({
            status,
            createdBy: 'GlobalExceptionFilter',
            errorMessage: (exception.message) 
                ? exception.message
                : 'Unexpected error ocurred'
        })
    }

}