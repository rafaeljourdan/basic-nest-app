import { CanActivate, ExecutionContext, Injectable, Next } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { jwtAuthorize } from './../jwt'

/*
- Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not.
- Guards are executed after each middleware, but before any interceptor or pipe.
*/

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean  {
        const host = context.switchToHttp()
        const req = host.getRequest()
        return this.isPublicRoute(context) || this.checkUserRoles(req, context)
    }

    private isPublicRoute (context: ExecutionContext): boolean | void {
        return !!this.reflector.get<boolean>("isPublicRoute", context.getHandler())
    }

    private checkUserRoles (req: any, context: ExecutionContext): boolean {
        const userRoles = (req['user'] && req['user']['roles']) || []
        const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler()) || []
        return jwtAuthorize(userRoles, allowedRoles)
    }
}