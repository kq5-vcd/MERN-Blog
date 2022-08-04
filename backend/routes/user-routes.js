import express from "express";
import { getAllUsers,signup, login, subscribe, cancelSubscribe } from "../controllers/user-controller";

const userRouter = express.Router()

userRouter.get("/", getAllUsers)
userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.put("/:id/subscribe/:subId", subscribe)
userRouter.put("/:id/cancel/:subId", cancelSubscribe)

export default userRouter