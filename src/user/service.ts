import { Injectable, NotFoundException } from '@nestjs/common'
import { UserRepository } from './repository'

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  
  private isRegisterNotFound = (register: any, id: number): void => {
    if (!register) {
      throw new NotFoundException(`Register with id ${id} not found`)
    }
  }
  
  public async getById(id): Promise<any> {
    const customer = await this.userRepository.getById(id)
    this.isRegisterNotFound(customer, id)
    return customer
  }
  
  public async getAll(): Promise<any[]> {
    return await this.userRepository.getAll()
  }
}
