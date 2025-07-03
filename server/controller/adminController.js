import Product from "../models/productSchema.js";
import jwt from 'jsonwebtoken';

export const adminLogin = async(req, res)=>{
    try {
        const {email, password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({
                success: false,
                message: "Invaild Credentials"
            })
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({
            success: true,
            token
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export const createProduct = async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.json(product);
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const updateProduct = async (req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteProduct = async (req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.send(product + 'product deleted');
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


