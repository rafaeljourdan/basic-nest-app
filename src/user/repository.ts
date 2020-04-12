import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema'

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private userModel: Model<User>) {}

    public async getAll(): Promise<any[]> {
        return this.userModel.find()
    }

    public async getById(_id: number): Promise<any[]> {
        return this.userModel.findOne({ _id })
    }
}