import { UnauthorizedException } from '@nestjs/common'

import * as jwt from 'jsonwebtoken'
import config from './contants'

const getToken = (req: Request): string => 
	req.headers['authorization']
	
const jwtLogin = (user: object): string => 
    jwt.sign(user, config['JWT_SALTKEY'], { expiresIn: config['JWT_EXPIRESIN'] })

const jwtAuthenticate = (req: Request, next: Function): void => {
	try {
		const token: string = getToken(req)
		if (!token) { throw new UnauthorizedException('Token required') }

		const tokenData: number = jwt.verify(token, config['JWT_SALTKEY'])
		if (!tokenData) { throw new UnauthorizedException('Token invalid') }

		console.log('tokenData', tokenData)

		req['user'] = tokenData
		next()
	} catch (error) {
		next(error)
	}
}

const jwtAuthorize = (userRoles: string[] = [], allowedRoles: string[] = []): boolean => {
	return (allowedRoles.length < 1)
		? true
		: !!(userRoles.find(userRole => allowedRoles.includes(userRole)))
}

export { jwtLogin, jwtAuthenticate, jwtAuthorize }