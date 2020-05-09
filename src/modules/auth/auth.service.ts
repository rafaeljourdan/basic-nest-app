import { Injectable } from '@nestjs/common'
import { jwtLogin } from './../../shared/jwt'
import { SignupDto, LoginDto } from './dto'
import { UserService } from '../user/user.service'
import { Md5 } from 'src/shared/md5'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async signup(signupDto: SignupDto): Promise<object> {
    signupDto.password = Md5.encrypt(signupDto.password)
    const user = await this.userService.signup(signupDto)
    return user
  }
  
  public async login(loginDto: LoginDto): Promise<object> {
    loginDto.password = Md5.encrypt(loginDto.password)
    const user = await this.userService.login(loginDto)

    const token = jwtLogin(user)
    return { token }
  }
}
