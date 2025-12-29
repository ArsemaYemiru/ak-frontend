'use client';

import CategoryCard from './CategoryCard';
import { Category } from '../types';

interface CategoryGridProps {
    categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
    return (
        <section className="category-section">
            <h2 className="section-title">SHOP BY CATEGORY</h2>
            <div className="category-grid">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>

            <style jsx>{`
        .category-section {
          padding: 5rem 2rem;
          background-color: #0f1419;
        }

        .section-title {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: white;
          text-align: center;
          margin: 0 0 3rem 0;
          letter-spacing: 0.1em;
        }

        .category-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .category-section {
            padding: 3rem 1rem;
          }

          .section-title {
            font-size: 1.5rem;
            margin-bottom: 2rem;
          }

          .category-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
        </section>
    );
}
