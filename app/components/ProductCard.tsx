import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <div className="product-card-container">
      <Link href={product.link} className="product-card">
        <div className="product-image-wrapper">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="product-overlay">
            <button
              onClick={handleAddToCart}
              className="cart-btn"
              aria-label="Add to cart"
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        <div className="product-info">
          <h4 className="product-name">{product.name}</h4>
          <p className="product-price">{product.price.toLocaleString()} birr</p>
        </div>
      </Link>

      <style jsx>{`
        .product-card-container {
            position: relative;
        }

        .product-card {
          display: block;
          text-decoration: none !important;
          border-radius: 16px;
          overflow: hidden;
          background-color: #141414;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .product-image-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
          background-color: #0d0d0d;
          overflow: hidden;
        }

        .product-image-wrapper :global(.product-image) {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .product-image-wrapper :global(.product-image) {
          transform: scale(1.1);
        }

        .product-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            padding: 1rem;
        }

        .product-card:hover .product-overlay {
            opacity: 1;
        }

        .cart-btn {
            background-color: #3b82f6;
            color: white;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.3s ease, background-color 0.3s ease;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            z-index: 10;
        }

        .cart-btn:hover {
            background-color: #2563eb;
            transform: scale(1.1) rotate(10deg);
        }

        .product-info {
          padding: 1.5rem;
          background-color: #141414;
        }

        .product-name {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1.125rem;
          font-weight: 500;
          color: white;
          margin: 0 0 0.5rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-price {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1rem;
          font-weight: 600;
          color: #3b82f6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .product-image-wrapper {
            height: 240px;
          }

          .product-overlay {
              opacity: 1;
              background: transparent;
          }

          .cart-btn {
              width: 36px;
              height: 36px;
          }

          .product-info {
            padding: 1rem;
          }

          .product-name {
            font-size: 1rem;
          }

          .product-price {
            font-size: 0.9375rem;
          }
        }
      `}</style>
    </div>
  );
}
