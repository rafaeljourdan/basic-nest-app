import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common'
import { Response } from 'express'

import AuthService from './auth.service'
import { SignupDto, LoginDto } from './dto'
import { IToken } from './auth.interface'
import { IUser } from '../user/user.interface'

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  public async signup(
			@Body() signupDto: SignupDto,
			@Res() res: Response
	): Promise<Response> {
    const data: IUser = await this.authService.signup(signupDto)
    return res
      .status(HttpStatus.OK)
      .json(data)
  }

  @Post('login')
  public async login(
		@Body() loginDto: LoginDto,
		@Res() res: Response
	): Promise<Response> {
		const data: IToken = await this.authService.login(loginDto)
		return res
      .status(HttpStatus.OK)
      .json(data)
  }

  /* @Get('me')
  public async getMyInfos(@Param() id: number): Promise<object> {
    return this.authService.getMyInfos(id)
  } */
}

export default AuthController
