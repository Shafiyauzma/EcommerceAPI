import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import bcrypt from 'bcrypt'

export const userRegister = async (req, res)=>{
    try {

     const { username, password, role } = req.body;
     if(!username || !password || !role){
        return res.json({
            success:false,
            message:'Missing Details! Please Fill all the Fields'
        })
      }

      //password encryption
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password,salt)

      const userData = {
            username,
            role,
            password: hashedPassword
      }

      const newUser = new User(userData)
      const user = await newUser.save()

      const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

       res.json({
            success:true,
            token,
            user:{
                name:user.username
            }
        })

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export const loginUser = async (req,res)=>{

    try{
        const {username,password} = req.body;
        const user = await User.findOne({username})

        if(!user){
            return res.json({
                success:false,
                message:"User doesn't exist"
            })
        }

        //comparing of passwords
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({
                success:true,
                token,
                user:{
                    name:user.name
                }
            })
        }else{
            return res.json({
                success:false,
                message:"Invalid Credentials"
            })
        }
    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }

}

export const getAllProducts = async (req,res)=>{
    try {
        const { page = 1, limit = 5, search = '', category = '' } = req.query;
        const query = {
             name: { $regex: search, $options: 'i' },
             ...(category && { category })
            };
        const products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
        res.json(products);
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}



