import Cart from "../models/cartSchema.js";

export const addcart = async (req , res)=>{
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

        const index = cart.items.findIndex(item => item.productId === productId);

        if (index > -1) {
            cart.items[index].quantity += quantity;
        } else {
          cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.json(cart);
        
    } catch (error) {
         res.json({
            success: false,
            message: error.message
        }) 
    }
}

export const findCart = async (req, res)=>{
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        res.json(cart);
    } catch (error) {
         res.json({
            success: false,
            message: error.message
        }) 
    }
}

export const deleteCart = async (req, res)=>{
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        
        cart.items = cart.items.filter(item => item.productId !== req.params.productId);
        
        await cart.save();
        res.json(cart);

    } catch (error) {
         res.json({
            success: false,
            message: error.message
        }) 
    }
}