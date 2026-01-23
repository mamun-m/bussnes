'use client';
import Image from 'next/image';
import './Popular.css';
import Link from 'next/link';
import { UsersContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function ProductCard({ product, buttonText = 'Buy Now' }) {
  const { addToCart } = UsersContext();
  const router = useRouter();
  const handleBuyNow = () => {
    addToCart(product);
    router.push('/cart');
  };
  const handlecart = () => {
    try {
      addToCart(product);
      toast.success('Add to cart successfull...');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };
  return (
    <div className="popular-card">
      <Link href={`/product/${product.slug}`}>
        <div className="product-image">
          <Image src={product.images[0]} width={300} height={200} alt={product.name} />
        </div>
      </Link>
      <div className="popularcardDescription">
        <div>
          <h2>{product.name.slice(0, 30)}</h2>
          <p>{product.desc}</p>
          <div className="PriceContainerShow_CARD">
            <p id="Price__firstprice">Price: ${product.price}</p>
            <p id="Beforprice__SHOW">{product.Beforprice}</p>
          </div>
        </div>
        <div className="price-BUTTON">
          <button id="addToCart" onClick={handlecart}>
            {product.addtocart}
          </button>
          <button onClick={handleBuyNow}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
}
