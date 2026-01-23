import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    products: [ProductSchema],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 50 },
    total: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
