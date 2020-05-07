import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from './repository'
import { CreateUserDto, UpdateUserDto } from './dto'
import { Md5 } from 'src/shared/md5'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  private isRegisterNotFound = (register: any): void => {
    if (!register) {
      throw new NotFoundException(`Register not found`)
    }
  }

  public signup(payload: object): any {
    return this.userRepository.signup(payload)
  }

  public async login({ email, password }): Promise<any> {
    const user = this.userRepository.login(email, password)
    return user || this.isRegisterNotFound(user)
  }

  public async getById(id: string): Promise<any> {
    const user = await this.userRepository.getById(id)
    return user || this.isRegisterNotFound(user)
  }

  public async getAll(): Promise<any[]> {
    return await this.userRepository.getAll()
  }

  public async create(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.password = Md5.encrypt(createUserDto.password)
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
