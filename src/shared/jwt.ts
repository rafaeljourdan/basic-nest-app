import { BadRequestException, UnauthorizedException } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'
import { JWT } from './constants'

const getToken = (req: Request): string => 
	req.headers['authorization']
	
const jwtLogin = (user: object): string => 
    jwt.sign(user, JWT['saltKey'], { expiresIn: JWT['expiresIn'] })

const jwtAuthenticate = async (req: Request, next: Function): Promise<void> => {
	try {
		const token: string = getToken(req)
		if (!token) { throw new BadRequestException('Token required') }

		const tokenData = jwt.verify(token, JWT['saltKey'])
		if (!tokenData) { throw new UnauthorizedException('Token invalid') }

		req['user'] = tokenData
		next()
	} catch (error) {
		next(error)
	}
}

const jwtAuthorize = (req: Request, allowedRoles: string[] = []): boolean => {
	const user: object = req['user']
	return allowedRoles.length < 1
		|| !!(user['roles'].find(userRole => allowedRoles.includes(userRole)))
}

export { jwtLogin, jwtAuthenticate, jwtAuthorize }