'use client';

import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="new-arrivals-section">
      <div className="section-header">
        <h2 className="section-title">NEW ARRIVALS</h2>
        <Link href="/new-arrivals" className="view-all-link">
          View All →
        </Link>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <style jsx>{`
        .new-arrivals-section {
          padding: 5rem 2rem;
          background-color: #0a0a0a;
        }

        .section-header {
          max-width: 1400px;
          margin: 0 auto 3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-title {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: white;
          margin: 0;
          letter-spacing: 0.1em;
        }

        .view-all-link {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1rem;
          color: #d4af37;
          text-decoration: none;
          transition: color 0.2s;
        }

        .view-all-link:hover {
          color: #c19b2e;
        }

        .products-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .new-arrivals-section {
            padding: 3rem 1rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
