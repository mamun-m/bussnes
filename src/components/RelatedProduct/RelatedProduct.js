'use client';
import { UsersContext } from '@/context/UserContext';
import ProductCard from '../popularProduct/ProductCard';
export default function RelatedProduct({ product }) {
  const { popularProductData } = UsersContext();
  const relatedFiveProducts = popularProductData
    .filter(
      (item) =>
        item.category?.toLowerCase() === product.category?.toLowerCase() && // same category
        item.slug !== product.slug,
    )
    .slice(0, 5);
  return (
    <div className="PopularContainer">
      <h1>Related Products </h1>
      <div>
        {relatedFiveProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}{' '}
      </div>
    </div>
  );
}
