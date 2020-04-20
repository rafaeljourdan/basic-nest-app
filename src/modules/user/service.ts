import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from './repository'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  
  private isRegisterNotFound = (register: any): void => {
    if (!register) {
      throw new NotFoundException(`Register not found`)
    }
  }
  
  public async signup(payload: object): Promise<any> {
    const user = await this.userRepository.signup(payload)
    this.isRegisterNotFound(user)
    return user
  }
  
  public async login({ email, password }): Promise<any> {
    const user = await this.userRepository.login(email, password)
    this.isRegisterNotFound(user)
    return user
  }

  public async getById(id: string): Promise<any> {
    const user = await this.userRepository.getById(id)
    this.isRegisterNotFound(user)
    return user
  }
  
  public async getAll(): Promise<any[]> {
    return await this.userRepository.getAll()
  }
}
