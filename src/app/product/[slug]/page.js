'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import '../product.css';
import { useEffect, useState } from 'react';
import { UsersContext } from '@/context/UserContext';
import Link from 'next/link';
import RelatedProduct from '@/components/RelatedProduct/RelatedProduct';
export default function Page() {
  const { slug } = useParams();
  const { popularProductData, addToCart } = UsersContext();
  const [activeImage, setActiveImage] = useState(null);
  const product = popularProductData.find((item) => item.slug === slug);
  useEffect(() => {
    if (product?.images?.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="container">
      <div className="singleProductDescription container">
        <div>
          {activeImage && <Image src={activeImage} alt={product.name} width={600} height={400} />}
          <div className="thumbnailContainer">
            {product?.images?.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt="thumbnail"
                width={140}
                height={120}
                onClick={() => setActiveImage(img)}
                className={activeImage === img ? 'activeThumb' : ''}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
        <div>
          <h1>{product.name}</h1>
          <Image src={product.rating} alt={product.rating} width={100} height={100} />
          <p>{product.ratingDes}</p>
          <div className="ProductPrice__Des">
            <strong id="descriptionRealPrice">Price: ৳{product.price}</strong>
            <p id="BeforePriceIndescription">৳ : {product.Beforprice} </p>
          </div>
          <hr className="hrproduct" />
          <br />
          <p>Brand: {product.brand}</p>
          <div className="productsButton">
            {product && (
              <button className="FirstButtonDEtails" onClick={() => addToCart(product)}>
                Add to cart
              </button>
            )}
            <Link href="/cart" id="link__detailsButton">
              <button onClick={() => addToCart(product)}>Buy Now </button>
            </Link>
          </div>
        </div>
      </div>
      <RelatedProduct product={product} />
    </div>
  );
}
