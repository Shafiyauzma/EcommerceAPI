import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
   },
  items: [
    { 
      productId: String, 
      quantity: Number 
    }
  ]
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart
