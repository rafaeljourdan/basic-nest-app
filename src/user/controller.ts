import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  public async getAll(): Promise<any[]> {
    const data = this.userService.getAll()
    return data 
  }
  
  @Get('/:id')
  public async getById(@Param('id') id: string): Promise<object> {
    return this.userService.getById(id)
  }
}
