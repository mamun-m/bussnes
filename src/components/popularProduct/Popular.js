'use client';
import { UsersContext } from '@/context/UserContext';
import './Popular.css';
import ProductCard from './ProductCard';
const Popular = () => {
  const { popularProductData } = UsersContext();
  const firstFiveProducts = popularProductData.slice(0, 5);
  return (
    <div className="PopularContainer">
      <h1>Our Products </h1>
      <div>
        {firstFiveProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}{' '}
      </div>
    </div>
  );
};

export default Popular;
