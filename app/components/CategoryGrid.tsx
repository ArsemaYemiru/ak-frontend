"use client"
import CategoryCard from './CategoryCard';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="category-section">
      <div className="container">
        <div className="header-info">
          <h2 className="section-title">Shop by Category</h2>
          <div className="title-accent" />
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .category-section {
          padding: 8rem 2rem;
          background-color: #0a0a0a;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .header-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 5rem;
        }

        .section-title {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 3rem;
          font-weight: 800;
          color: white;
          text-align: center;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .title-accent {
            width: 60px;
            height: 4px;
            background-color: #3b82f6;
            border-radius: 2px;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
        }

        @media (max-width: 1200px) {
            .category-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 640px) {
          .category-section {
            padding: 5rem 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .category-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
