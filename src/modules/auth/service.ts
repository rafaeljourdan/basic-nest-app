import { Injectable } from '@nestjs/common'
import * as md5 from 'md5'
import { jwtLogin } from './../../shared/jwt'
import { JWT } from './../../shared/constants'
import { SignupDto, LoginDto } from './dto'
import { UserService } from '../user/service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signup(signupDto: SignupDto): Promise<object> {
    signupDto.password = this.encryptMd5(signupDto.password)
    const user = await this.userService.signup(signupDto)
    return user
  }
  
  public async login(loginDto: LoginDto): Promise<object> {
    loginDto.password = this.encryptMd5(loginDto.password)
    const user = await this.userService.login(loginDto)

    const token = jwtLogin(user)
    return { token }
  }

  private encryptMd5(password: string): string {
    return md5(password, JWT['saltKey'])
  }

}
