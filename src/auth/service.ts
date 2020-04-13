import { Injectable } from '@nestjs/common'
import { SignupDto, LoginDto } from './dto'

@Injectable()
export class AuthService {  
  
  public signup(signupDto: SignupDto): object {
    return signupDto
  }
  
  public login(loginDto: LoginDto): object {
    return loginDto
  }
}
