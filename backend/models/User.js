import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog",
        required: true
    }],
    subscriptions: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }],
    authId: {
        type: String,
        required: false,
        defaul: ""
    }
})

export default mongoose.model('User', userSchema)