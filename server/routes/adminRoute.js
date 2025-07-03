import express from 'express'
import { restrictTo, userAuth } from '../middleware/auth.js'
import { createProduct, deleteProduct, updateProduct } from '../controller/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/products',userAuth,restrictTo('admin'),createProduct)
adminRouter.put('/products/:id',userAuth,restrictTo('admin'),updateProduct)
adminRouter.delete('/products/:id',userAuth,restrictTo('admin'),deleteProduct)

export default adminRouter




