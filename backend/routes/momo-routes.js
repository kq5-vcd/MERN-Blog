import express from "express";
import { pay, result } from "../controllers/momo-controller";

const momoRouter = express.Router()

momoRouter.post("/", pay)
momoRouter.post("/result", result)

export default momoRouter