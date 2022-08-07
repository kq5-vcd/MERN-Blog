import express from "express";
import { getAllUsers, getUserList,signup, login, subscribe, cancelSubscribe, getSubscriptions } from "../controllers/user-controller";

const userRouter = express.Router()

userRouter.get("/", getAllUsers)
userRouter.get("/users", getUserList)
userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.get("/:id/subscribe/:subId", subscribe)
userRouter.get("/:id/subscriptions", getSubscriptions)
userRouter.put("/:id/cancel/:subId", cancelSubscribe)

export default userRouter