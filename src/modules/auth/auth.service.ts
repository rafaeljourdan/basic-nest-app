import { Injectable } from '@nestjs/common'

import { jwtLogin } from './../../shared/jwt'
import { SignupDto, LoginDto } from './dto'
import UserService from '../user/user.service'
import { Md5 } from './../../shared/util'
import { IToken } from './auth.interface'
import { IUser } from '../user/user.interface'

@Injectable()
class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signup(signupDto: SignupDto): Promise<IUser> {
    return await this.userService.signup(signupDto)
  }

  public async login(loginDto: LoginDto): Promise<IToken> {
    loginDto.password = Md5.encrypt(loginDto.password)
    const user = await this.userService.login(loginDto)
    const token = jwtLogin(user)
    return { token }
  }
}

export default AuthService
