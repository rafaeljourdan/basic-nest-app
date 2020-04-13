import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema'

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('User') private userModel: Model<User>) {}

    public getAll(): User[] {
        return this.userModel
            .find()
            .lean()
    }

    public getById(_id: number): User {
        return this.userModel
            .findOne({ _id })
            .lean()
    }
}