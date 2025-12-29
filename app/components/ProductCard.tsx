'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={product.link} className="product-card">
            <div className="product-image-wrapper">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="product-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </div>
            <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-price">${product.price.toFixed(2)}</p>
            </div>

            <style jsx>{`
        .product-card {
          display: block;
          text-decoration: none;
          border-radius: 12px;
          overflow: hidden;
          background-color: #2a2f3e;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .product-image-wrapper {
          position: relative;
          width: 100%;
          height: 280px;
          background-color: #f5f5f5;
        }

        .product-image-wrapper :global(.product-image) {
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image-wrapper :global(.product-image) {
          transform: scale(1.05);
        }

        .product-info {
          padding: 1.25rem;
          background-color: #1a1f2e;
        }

        .product-name {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1rem;
          font-weight: 500;
          color: white;
          margin: 0 0 0.5rem 0;
        }

        .product-price {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1.125rem;
          font-weight: 600;
          color: #3b82f6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .product-image-wrapper {
            height: 220px;
          }

          .product-info {
            padding: 1rem;
          }

          .product-name {
            font-size: 0.9rem;
          }

          .product-price {
            font-size: 1rem;
          }
        }
      `}</style>
        </Link>
    );
}
