import { NestMiddleware } from "@nestjs/common";
import { jwtAuthenticate } from './../jwt'

export class GetUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        jwtAuthenticate(req, next)
    }
}