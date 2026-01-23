import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongoose';
import CartItem from '../../../../models/CartItem';
export async function POST(request) {
  try {
    await connectToDatabase();

    const { productId, name, quantity, price, images } = await request.json();

    if (!productId) {
      return NextResponse.json({ message: 'userId or productId missing' }, { status: 400 });
    }

    const qty = Number(quantity || 1);

    const existingItem = await CartItem.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += qty;
      await existingItem.save();
      return NextResponse.json(existingItem, { status: 200 });
    }

    const item = await CartItem.create({
      productId,
      name,
      quantity: qty,
      price,
      images,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to add cart item' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const cartItems = await CartItem.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(cartItems), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'GET cart failed' }), { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const { productId } = await request.json();
    await CartItem.findOneAndDelete({ productId });
    return new Response(JSON.stringify({ message: 'Item removed from cart' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Delete item from cart' }), {
      status: 500,
    });
  }
}

export async function PATCH(req) {
  try {
    await connectToDatabase();
    const { productId, action } = await req.json();

    const item = await CartItem.findOne({ productId });
    if (!item) return new Response(JSON.stringify({ error: 'Item not found' }), { status: 404 });

    if (action === 'increment') item.quantity += 1;
    else if (action === 'decrement' && item.quantity > 1) item.quantity -= 1;

    await item.save();
    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update quantity' }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    console.log('PUT BODY:', body);

    const { productId, action } = body;

    if (!productId || !action) {
      return NextResponse.json({ error: 'productId and action required' }, { status: 400 });
    }

    const cartItem = await CartItem.findOne({
      productId: String(productId),
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    if (action === 'decrement' && cartItem.quantity <= 1) {
      return NextResponse.json(cartItem, { status: 200 });
    }

    const updatedItem = await CartItem.findOneAndUpdate(
      { productId: String(productId) },
      {
        $inc: {
          quantity: action === 'increment' ? 1 : -1,
        },
      },
      { new: true },
    );

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update quantity' }, { status: 500 });
  }
}
