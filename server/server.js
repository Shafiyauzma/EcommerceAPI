import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import adminRouter from './routes/adminRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRoute from './routes/orderRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/',(req,res)=>{
    res.send("Api Is Working")
})

app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRoute)

app.listen(PORT, ()=>{
    console.log('Server is running on port ' + PORT)
})

export default app;