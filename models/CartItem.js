import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    images: { type: [String], required: true, default: [] },
  },
  { timestamps: true },
);

export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
