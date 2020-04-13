import * as mongoose from 'mongoose'

interface User extends Document {}

const UserSchema = new mongoose.Schema({
    country: String,
    // language: String,
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
    }
})

export { UserSchema, User }