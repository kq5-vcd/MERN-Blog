import mongoose from "mongoose";

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    premium: {
        type: Boolean,
        required: true,
        default: false
    },
    img: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
})

export default mongoose.model('Blog', blogSchema)