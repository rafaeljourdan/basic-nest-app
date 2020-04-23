import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common'
import { UserService } from './service'
import { AuthorizationGuard } from 'src/shared/guards/authorization.guard'
import { Roles } from 'src/shared/decorators/roles.decorator'

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

  // Only for test
  @Get('test/admin')
  @Roles('admin')
  public getAdmins(): any {
    return ['admin 1', 'admin 2']
  }
}
