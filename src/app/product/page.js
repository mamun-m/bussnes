'use client';
import ProductCard from '@/components/popularProduct/ProductCard';
import { UsersContext } from '@/context/UserContext';
import '@/components/popularProduct/Popular.css';
export default function Page() {
  const { popularProductData } = UsersContext();
  return (
    <div className="PopularContainer container">
      <h1>All products ... </h1>
      <div>
        {popularProductData.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}
