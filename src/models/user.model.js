import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    phoneNo: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

})

export const UserModel = mongoose.model('User', UserSchema)