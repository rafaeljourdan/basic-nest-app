import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { jwtAuthorize } from './../jwt'

/*
- Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not.
- Guards are executed after each middleware, but before any interceptor or pipe.
*/

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean  {
        const host = context.switchToHttp()
        const req = host.getRequest()
        const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler())

        return jwtAuthorize(req, allowedRoles)
    }
}