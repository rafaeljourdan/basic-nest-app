import { NestMiddleware } from '@nestjs/common'
import { jwtAuthenticate } from './../jwt'

export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): void {
        jwtAuthenticate(req, next)
    }
}