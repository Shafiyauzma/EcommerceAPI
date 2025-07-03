import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Order = mongoose.model('Order', OrderSchema);

export default Order