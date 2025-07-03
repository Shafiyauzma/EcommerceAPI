import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js";

export const order = async (req, res)=>{
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart || cart.items.length === 0) return res.status(400).send('Cart is empty');
        const order = new Order({ userId: req.user.id, items: cart.items });
        await order.save();
        cart.items = [];
        await cart.save();
        res.json(order);

    } catch (error) {
         res.json({
            success: false,
            message: error.message
        }) 
    }
}