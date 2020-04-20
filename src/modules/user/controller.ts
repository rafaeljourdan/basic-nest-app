import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common'
import { UserService } from './service'
import { AuthorizationGuard } from 'src/shared/guards/authorization.guard'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(new AuthorizationGuard(['customer']))
  public async getAll(): Promise<any[]> {
    return this.userService.getAll()
  }
  
  @Get('/:id')
  @UseGuards(new AuthorizationGuard(['customer', 'admin']))
  public async getById(
    @Param('id') id: string
  ): Promise<any> {
    return this.userService.getById(id)
  }
}
