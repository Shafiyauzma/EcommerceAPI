import express from 'express'
import { restrictTo, userAuth } from '../middleware/auth.js'
import { addcart, deleteCart, findCart } from '../controller/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/cart',userAuth,restrictTo('customer'),addcart);
cartRouter.get('/cart',userAuth,restrictTo('customer'),findCart);
cartRouter.delete('/cart/:productId',userAuth,restrictTo('customer'),deleteCart)

export default cartRouter