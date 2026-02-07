import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem } = useCartStore();
  const isInCart = items.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) return;

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
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="product-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="product-image-placeholder" />
          )}
        </div>
        <div className="product-info-row">
          <div className="product-text">
            <h4 className="product-name">{product.name}</h4>
            <p className="product-price">{product.price.toLocaleString()} birr</p>
          </div>
          <button
            onClick={handleAddToCart}
            className={`cart-btn ${isInCart ? 'added' : ''}`}
            disabled={isInCart}
            aria-label={isInCart ? "In cart" : "Add to cart"}
          >
            {isInCart ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
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
          background-color: var(--dropdown-bg);
          border: 1px solid var(--dropdown-border);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          border-color: rgba(212, 175, 55, 0.3);
        }

        .product-image-wrapper {
          position: relative;
          width: 100%;
          height: 320px;
          background-color: var(--background);
          overflow: hidden;
        }

        .product-image-placeholder {
          width: 100%;
          height: 100%;
          background-color: #1a1a1a;
          background-image: linear-gradient(45deg, #1a1a1a 25%, #262626 25%, #262626 50%, #1a1a1a 50%, #1a1a1a 75%, #262626 75%, #262626 100%);
          background-size: 20px 20px;
        }

        .product-image-wrapper :global(.product-image) {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .product-image-wrapper :global(.product-image) {
          transform: scale(1.1);
        }

        .product-info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem;
            background-color: var(--dropdown-bg);
            gap: 1rem;
        }

        .product-text {
            flex: 1;
            min-width: 0;
        }

        .cart-btn {
            background-color: rgba(212, 175, 55, 0.1);
            color: #d4af37;
            border: 1px solid rgba(212, 175, 55, 0.2);
            width: 40px;
            height: 40px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            flex-shrink: 0;
        }

        .cart-btn:not(.added):hover {
            background-color: #d4af37;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .cart-btn.added {
            background-color: rgba(16, 185, 129, 0.1);
            color: #10b981;
            border-color: rgba(16, 185, 129, 0.2);
            cursor: default;
        }

        .product-name {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--foreground);
          margin: 0 0 0.5rem 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-price {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1rem;
          font-weight: 600;
          color: #d4af37;
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
