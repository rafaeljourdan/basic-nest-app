import { Response } from 'express'
import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus } from '@nestjs/common'
import { UserService } from './service'
import { Roles } from 'src/shared/decorators/roles.decorator'
import { Public } from 'src/shared/decorators/public.decorator'
import { CreateUserDto, UpdateUserDto } from './dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles('customer')
  public async getAll(@Res() res: Response): Promise<Response> {
    const data =  await this.userService.getAll()
    return res
      .status(HttpStatus.OK)
      .json({
        status: true,
        data
      })
  }

  @Get('/:id')
  @Roles('customer', 'admin')
  public async getById(
    @Param('id') id: string
  ): Promise<any> {
    return this.userService.getById(id)
  }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<object> {
    return this.userService.create(createUserDto)
  }

  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<object> {
    return this.userService.update(id, updateUserDto)
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<object> {
    return this.userService.remove(id)
  }

  @Get('example/open_route')
  @Public()
  public example(): any {
    return ['admin 1', 'admin 2', 'admin 3']
  }

}
