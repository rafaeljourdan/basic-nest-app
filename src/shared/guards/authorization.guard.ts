import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import { jwtAuthorize } from './../jwt'

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private allowedRoles:string[] = []) {}

    canActivate(context: ExecutionContext): boolean  {
        const host = context.switchToHttp()
        const req = host.getRequest()

        return jwtAuthorize(req, this.allowedRoles)
    }
}