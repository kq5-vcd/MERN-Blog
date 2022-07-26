import express from 'express';
import mongoose from 'mongoose';

import userRouter from "./routes/user-routes"
import blogRouter from "./routes/blog-routes"

import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

const app = express()

passport.use(new Strategy())

// Middlewares
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

mongoose.connect("mongodb+srv://admin:BnyKiYC8DHo38y7E@cluster0.uz16h.mongodb.net/blog?retryWrites=true&w=majority")
.then(() => console.log("Connected To Database"))
.then(() => {
    app.listen(2022)
})
.catch((err) => console.log(err))