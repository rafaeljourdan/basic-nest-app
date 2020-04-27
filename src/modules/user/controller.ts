import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common'
import { UserService } from './service'
import { Roles } from 'src/shared/decorators/roles.decorator'
import { Public } from 'src/shared/decorators/public.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles('customer')
  public async getAll(): Promise<any[]> {
    return this.userService.getAll()
  }

  @Get('/:id')
  @Roles('customer', 'admin')
  public async getById(
    @Param('id') id: string
  ): Promise<any> {
    return this.userService.getById(id)
  }

  @Get('example/open_route')
  @Public()
  public example(): any {
    return ['admin 1', 'admin 2', 'admin 3']
  }

}
