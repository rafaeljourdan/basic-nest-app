import { Controller, Post, UsePipes, Body, ValidationPipe } from '@nestjs/common'
import { AuthService } from './service'
import { SignupDto, LoginDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @UsePipes(ValidationPipe)
  public async signup(@Body() signupDto: SignupDto): Promise<object> {
    return this.authService.signup(signupDto)
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  public async login(@Body() loginDto: LoginDto): Promise<object> {
    return this.authService.login(loginDto)
  }
}
