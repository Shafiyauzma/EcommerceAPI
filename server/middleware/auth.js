import jwt from 'jsonwebtoken'

export const userAuth = async (req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({
            success:false,
            message:'Not Authorized.Login Again'
        })
    }

    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).send('Invalid token');
            req.user = user;
            next();
        });

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({
                success:false,
                message:'Not Authorized.Login Again'
            })
        }

        next();

    }catch(error){
        return res.json({
            success:false,
            message:error.message
        })
    }
}



export const restrictTo = (role) => (req, res, next) => {
  if (req.user.role !== role) 
    return res.status(403).send('Access denied');
  next();
};