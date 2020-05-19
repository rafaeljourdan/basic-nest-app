import { Injectable } from '@nestjs/common'

import { CreateUserDto, UpdateUserDto } from './dto'
import UserRepository from './user.repository'
import { UtilService } from 'src/shared/util/util.service'
import { IUser } from './user.interface'

@Injectable()
class UserService {
  constructor(
		private userRepository: UserRepository
	) {}

  public signup(payload: object): any {
    return this.userRepository.signup(payload)
  }

  public async login({ email, password }): Promise<IUser> {
    const user = await this.userRepository.login(email, password)
		UtilService.isRegisterNotFound(user)
		return user
  }

  public async getById(id: string): Promise<IUser> {
    const user = await this.userRepository.getById(id)
		UtilService.isRegisterNotFound(user)
		return user
  }

  public async getAll(): Promise<any[]> {
    return await this.userRepository.getAll()
  }

  public async create(createUserDto: CreateUserDto): Promise<any> {
    return await this.userRepository.create(createUserDto)
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    delete updateUserDto.password
    return await this.userRepository.update(id, updateUserDto)
  }

  public async remove(id: string): Promise<any> {
    return await this.userRepository.remove(id)
  }
}

export default UserService
