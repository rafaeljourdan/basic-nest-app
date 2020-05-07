import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUser } from './schema'

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel('User') private model: Model<IUser>) {}

    public signup(payload: object): IUser {
        return this.create(payload)
    }
    
    public login(email: string, password: string): IUser {
        return this.model
            .findOne({ email, password })
            .select('-password')
            .lean()
    }
    
    public getAll(): IUser[] {
        return this.model
            .find()
            .select('-password')
            .lean()
    }

    public getById(_id: string): IUser {
        return this.model
            .findOne({ _id })
            .select('-password')
            .lean()
    }

    public create(payload: object): IUser {
        return this.model
            .create(payload)
    }

    public update(_id: string, payload: object): IUser {
        return this.model
            .findOneAndUpdate({ _id }, payload, { new: true })
    }

    public remove(_id: string): IUser {
        return this.model
            .findOneAndRemove({ _id })
    }
}