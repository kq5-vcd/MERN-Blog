import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import userRouter from "./routes/user-routes"
import blogRouter from "./routes/blog-routes"
import oauthRouter from './routes/oauth-routes';
import passport from './controllers/oauth-controller'
import momoRouter from './routes/momo-routes';
import { key } from './oauthKey';
import cors from 'cors'

const app = express()

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,PUT,POST,DELETE",
  credentials: true
}))
// Middlewares
app.use(express.json())

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secret: key.cookieSecret
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)
app.use('/api/oauth2', oauthRouter)
app.use('/api/momo', momoRouter)

mongoose.connect("mongodb+srv://admin:BnyKiYC8DHo38y7E@cluster0.uz16h.mongodb.net/blog?retryWrites=true&w=majority")
.then(() => console.log("Connected To Database"))
.then(() => {
    app.listen(2022)
})
.catch((err) => console.log(err))