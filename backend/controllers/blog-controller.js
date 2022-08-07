import mongoose from "mongoose"
import Blog from "../models/Blog"
import User from "../models/User"

export const getAllBlogsAdmin = async (req,res,next) => {
    let blogs

    try {
        blogs = await Blog.find().populate({ path: 'user', select: 'name' })
    } catch (error) {
        console.log(error);
    }

    if(!blogs) {
        return res.status(404).json({message: "No blog found"})
    }

    return res.status(200).json({blogs})
}

export const getAllBlogs = async (req,res,next) => {
    const userId = req.params.userId

    let blogs
    let user
    
    try {
        user = await User.findById(userId)
    } catch (error) {
        console.log(error);
    }

    if(!user) {
        return res.status(404).json({message: "No user found."})
    }  

    try {
        blogs = await Blog.find({
            $or: [
                {premium: false},
                {user: {$in: user.subscriptions}},
                {user: user._id}
            ]
        }).populate({ path: 'user', select: 'name' })//.reverse()
        blogs.reverse()
    } catch (error) {
        console.log(error);
    }

    if(!blogs) {
        return res.status(404).json({message: "No blog found"})
    }

    return res.status(200).json({blogs})
}

export const addBlog = async (req,res,next) => {
    let blog
    const user = req.params.userId
    const { title, description, content, premium, img } = req.body

    let existingUser
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        console.log(error);
    }

    if(!existingUser) {
        return res.status(500).json({message: "No user found."})
    }

    blog = new Blog({
        title, 
        description, 
        content, 
        premium,
        img, 
        user
    })

    try {
        const session = await mongoose.startSession()
        session.startTransaction()

        await blog.save({session})

        existingUser.blogs.push(blog)
        await existingUser.save({session})

        await session.commitTransaction()
    } catch (error) {
        console.log(error);
    }

    if(!blog) {
        return res.status(500).json({message: "Unable to add."})
    }

    return res.status(201).json({blog})
}

export const updateBlog = async (req,res,next) => {
    const id = req.params.id
    const { title, description, content, img, premium } = req.body
    let blog

    try {
        blog = await Blog.findByIdAndUpdate(id, {
            title, 
            description, 
            content,
            premium, 
            img
        })

        await blog.save()
    } catch (error) {
        console.log(error);
    }

    if(!blog) {
        return res.status(404).json({message: "Unable to update by this Id."})
    }

    return res.status(200).json({blog})
}

export const getById = async (req,res,next) => {
    const id = req.params.id
    let blog

    try {
        blog = await Blog.findById(id).populate({ path: 'user', select: 'name' })
    } catch (error) {
        console.log(error);
    }

    if(!blog) {
        return res.status(404).json({message: "No blog found."})
    }

    return res.status(200).json({blog})
}

export const getByUserIdAdmin = async (req,res,next) => {
    const userId = req.params.id
    let userBlogs

    try {
        userBlogs = await User.findById(userId).populate("blogs")
    } catch (error) {
        console.log(error);
    }

    if(!userBlogs) {
        return res.status(404).json({message: "No blog found."})
    }

    return res.status(200).json({blogs: userBlogs.blogs})
}

export const getByUserId = async (req,res,next) => {
    const authorId = req.params.id
    const userId = req.params.userId

    let user
    let author
    
    try {
        user = await User.findById(userId)
    } catch (error) {
        console.log(error);
    }

    if(!user) {
        return res.status(404).json({message: "No user found."})
    }  

    try {
        //author = await User.findById(authorId).populate({path: "blogs", match: {premium: false}})
        author = await User.findById(authorId).populate("blogs")

        author.premium = author.blogs.reduce((count, blog) => {
            if(blog.premium) return count + 1
            return count
        }, 0)

        const tempBlogs = author.blogs.filter((blog) => {
            if(userId === authorId || user.subscriptions.includes(authorId)) return blog
            else return !blog.premium
        })

        author.blogs = tempBlogs

    } catch (error) {
        console.log(error);
    }

    if(!author) {
        return res.status(404).json({message: "No author found."})
    }

    return res.status(200).json({user: {
        _id: author._id,
        name: author.name,
        blogs: author.blogs,
        premium: author.premium
    }})
}

export const deleteById = async (req,res,next) => {
    const id = req.params.id
    let blog

    try {
        blog = await Blog.findByIdAndRemove(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (error) {
        console.log(error);
    }

    if(!blog) {
        return res.status(404).json({message: "Unable to delete by this Id."})
    }

    return res.status(200).json({message: "Blog deleted."})
}