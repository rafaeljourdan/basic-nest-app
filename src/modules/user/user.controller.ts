import { Response } from 'express'
import { Controller, Get, Param, Post, Body, Put, Delete, Res, HttpStatus } from '@nestjs/common'

import UserService from './user.service'
import { Roles } from 'src/shared/decorators/roles.decorator'
import { Public } from 'src/shared/decorators/public.decorator'
import { CreateUserDto, UpdateUserDto } from './dto'
import { IUser } from './user.interface'

@Controller('users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('customer')
  public async getAll(@Res() res: Response): Promise<Response> {
    const data: IUser[] =  await this.userService.getAll()
    return res
      .status(HttpStatus.OK)
      .json(data)
  }

  @Get('/:id')
  @Roles('customer', 'admin')
  public async getById(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response> {
		const data: IUser = await this.userService.getById(id)
		return res
      .status(HttpStatus.OK)
      .json(data)
  }

  @Post()
  public async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ): Promise<Response> {
    const data: IUser = await this.userService.create(createUserDto)
    return res
      .status(HttpStatus.OK)
      .json(data)
  }

  @Put('/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ): Promise<Response> {
    const data: IUser = await this.userService.update(id, updateUserDto)
    return res
      .status(HttpStatus.OK)
      .json(data)
  }

  @Delete('/:id')
  public async remove(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response> {
    const data: IUser = await this.userService.remove(id)
    return res
      .status(HttpStatus.OK)
      .json(data)
  }

  // Only for test
  @Get('example/open_route')
  @Public()
  public example(): any {
    return ['admin 1', 'admin 2', 'admin 3']
  }

}

export default UserController
