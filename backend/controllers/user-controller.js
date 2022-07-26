import User from "../models/User"
import bcrypt from "bcryptjs"

export const getAllUsers = async (req,res,next) => {
    let users

    try {
        users = await User.find()
    } catch (error) {
        console.log(error);
    }

    if(!users) {
        return res.status(404).json({message: "No user found"})
    }

    return res.status(200).json({users})
}

export const getUserList = async (req,res,next) => {
    let users

    try {
        users = await User.find().populate("blogs")
    } catch (error) {
        console.log(error);
    }

    if(!users) {
        return res.status(404).json({message: "No user found"})
    }

    const userList = users.map((user) => {
        return {
            _id: user._id,
            name: user.name,
            free: user.blogs.reduce((count, blog) => {
                if(blog.premium) return count
                return count + 1
            }, 0),
            premium: user.blogs.reduce((count, blog) => {
                if(blog.premium) return count + 1
                return count
            }, 0)
        }
    })

    return res.status(200).json({userList})
}

export const signup = async (req,res,next) => {
    const { name, email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({name})
    } catch (error) {
        console.log(error);
    }

    if(existingUser) {
        return res.status(400).json({message: "User already exists."})
    }

    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        console.log(error);
    }

    if(existingUser) {
        return res.status(400).json({message: "User already exists."})
    }

    const hashedPass = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPass,
        blogs: [],
        subscriptions: []
    })

    try {
        await user.save()
    } catch (error) {
        console.log(error);
    }

    if(!user) {
        return res.status(500).json({message: "Unable to registers."})
    }

    return res.status(201).json({user})
}

export const login = async (req,res,next) => {
    const { name, password } = req.body
    let user

    let existingUserName
    try {
        existingUserName = await User.findOne({name})
    } catch (error) {
        console.log(error);
    }

    let existingUserEmail
    try {
        existingUserEmail = await User.findOne({email:name})
    } catch (error) {
        console.log(error);
    }

    if(existingUserName) {
        user = existingUserName
    } else if(existingUserEmail) {
        user = existingUserEmail
    } else {
        return res.status(404).json({message: "Could not find any user by that name or email."})
    }  

    const correctPass = bcrypt.compareSync(password, user.password)

    if(!correctPass) {
        return res.status(400).json({message: "Incorrect password."})
    }
    
    return res.status(200).json({user})
}

export const subscribe = async (req,res,next) => {
    const userId = req.params.id
    const subId = req.params.subId

    let user
    let subUser

    try {
        user = await User.findById(userId)
        subUser = await User.findById(subId)
    } catch (error) {
        console.log(error);
    }

    if(!user) {
        return res.status(404).json({message: "No user found."})
    }  

    if(!subUser) {
        return res.status(404).json({message: "No subscription found."})
    } 
    
    try {
        user.subscriptions.push(subUser)
        await user.save()
    } catch (error) {
        console.log(error);
    }

    res.redirect(`http://localhost:3000/user/${subId}`)
}

export const cancelSubscribe = async (req,res,next) => {
    const userId = req.params.id
    const subId = req.params.subId

    let user
    let subUser

    try {
        user = await User.findById(userId).populate("subscriptions")
        subUser = await User.findById(subId)
    } catch (error) {
        console.log(error);
    }

    if(!user) {
        return res.status(404).json({message: "No user found."})
    }  

    if(!subUser) {
        return res.status(404).json({message: "No subscription found."})
    } 
    
    try {
        await user.subscriptions.pull(subUser)
        await user.save()
    } catch (error) {
        console.log(error);
    }
    
    return res.status(200).json({message: "Subscription successful."})
}

export const getSubscriptions = async (req,res,next) => {
    const userId = req.params.id

    let user

    try {
        user = await User.findById(userId)
    } catch (error) {
        console.log(error);
    }

    if(!user) {
        return res.status(404).json({message: "No user found."})
    }  

    const sub = user.subscriptions
    return res.status(200).json({sub})
}