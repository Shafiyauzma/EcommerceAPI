import express from 'express'
import { restrictTo, userAuth } from '../middleware/auth.js';
import { order } from '../controller/orderController.js';


const orderRoute = express.Router()

orderRoute.post('/order',userAuth,restrictTo('customer'),order)

export default orderRoute