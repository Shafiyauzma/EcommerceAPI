import express from 'express'
import { getAllProducts, loginUser, userRegister } from '../controller/userController.js'

const userRouter = express.Router()

userRouter.post('/register',userRegister)
userRouter.post('/login',loginUser)
userRouter.get('/products',getAllProducts)

export default userRouter
