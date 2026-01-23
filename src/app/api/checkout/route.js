import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongoose';
import Order from '../../../../models/Order';

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { fullname, phone, area, city, cart } = body;
    if (!cart || cart.length === 0) {
      return NextResponse.json({ success: false, message: 'Cart is empty' }, { status: 400 });
    }
    const formattedCart = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity,
    }));
    const subtotal = formattedCart.reduce((acc, item) => acc + item.subtotal, 0);
    const deliveryFee = 50;
    const total = subtotal + deliveryFee;
    const order = await Order.create({
      fullname,
      phone,
      area,
      city,
      products: formattedCart,
      subtotal,
      deliveryFee,
      total,
    });
    return NextResponse.json({ success: true, orderId: order._id, order }, { status: 201 });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }
}
