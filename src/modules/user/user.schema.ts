import { Schema } from 'mongoose'

import { UtilService } from './../../shared/util/util.service'

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

UserSchema.pre('save', function(next: Function): void {
    if (this.isNew) {
        this.password = UtilService.encrypt(this.password)
    }
    next()
})

export { UserSchema }
