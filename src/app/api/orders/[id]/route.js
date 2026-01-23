import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongoose';
import Order from '../../../../../models/Order';

export async function DELETE(req, context) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json({ message: 'order not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'order deleted successfull' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
