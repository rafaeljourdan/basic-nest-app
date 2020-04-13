import { ArgumentsHost, ExceptionFilter, HttpException, Catch } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log('http exception handler was triggered', exception)

        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const { statusCode: status, message: errorMessage }: any = exception.getResponse()

        return response.status(status).json({
            status,
            createdBy: 'HttpExceptionFilter',
            errorMessage
        })
    }
}