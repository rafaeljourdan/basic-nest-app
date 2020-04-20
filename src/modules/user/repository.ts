import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema'

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('User') private userModel: Model<User>) {}

    public signup(payload: object): User {
        return this.userModel
            .create(payload)
    }
    
    public login(email: string, password: string): User {
        return this.userModel
            .findOne({ email, password })
            .select('-password')
            .lean()
    }
    
    public getAll(): User[] {
        return this.userModel
            .find()
            .select('-password')
            .lean()
    }

    public getById(_id: string): User {
        return this.userModel
            .findOne({ _id })
            .select('-password')
            .lean()
    }
}