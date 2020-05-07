import { Document, Schema } from 'mongoose'

interface IUser extends Document {
    readonly country: string
}

const schema = {
    country: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: ''
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    flagTermsAccepted: {
        type: Boolean,
        required: true
    },
    roles: {
        type: Array,
        default: ['customer']
    }
}

const UserSchema = new Schema(schema, { timestamps: true })

export { UserSchema, IUser }