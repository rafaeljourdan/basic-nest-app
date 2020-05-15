import { Injectable, Inject } from '@nestjs/common'
import { Model } from 'mongoose'

import { IUser } from './user.interface'

@Injectable()
class UserRepository {
	constructor(
		@Inject('USER_MODEL') private readonly model: Model<IUser>
	) { }

	public signup(payload: object): Promise<IUser> {
		return this.create(payload)
	}

	public login(email: string, password: string): Promise<IUser> {
		return this.model
			.findOne({ email, password })
			.select('-password')
			.lean()
	}

	public getAll(): Promise<IUser[]> {
		return this.model
			.find()
			.select('-password')
			.lean()
	}

	public getById(_id: string): Promise<IUser> {
		return this.model
			.findOne({ _id })
			.select('-password')
			.lean()
	}

	public create(payload: object): Promise<IUser> {
		return this.model
			.create(payload)
	}

	public update(_id: string, payload: object): Promise<IUser> {
		return this.model
			.findOneAndUpdate({ _id }, payload, { new: true })
	}

	public remove(_id: string): Promise<IUser> {
		return this.model
			.findOneAndRemove({ _id })
	}
}

export default UserRepository
