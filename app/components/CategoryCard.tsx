'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={category.link} className="category-card">
      <div className="category-image-wrapper">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="category-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="category-image-placeholder" />
        )}
        <div className="category-overlay">
          <h3 className="category-name">{category.name}</h3>
          <div className="explore-btn">Explore</div>
        </div>
      </div>

      <style jsx>{`
        .category-card {
          display: block;
          text-decoration: none !important;
          border-radius: 20px;
          overflow: hidden;
          background-color: #141414;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .category-card:hover {
          transform: scale(1.02);
          border-color: rgba(59, 130, 246, 0.3);
        }

        .category-image-wrapper {
          position: relative;
          width: 100%;
          height: 480px;
          background-color: #0d0d0d;
        }

        .category-image-placeholder {
          width: 100%;
          height: 100%;
          background-color: #1a1a1a;
          background-image: linear-gradient(45deg, #1a1a1a 25%, #262626 25%, #262626 50%, #1a1a1a 50%, #1a1a1a 75%, #262626 75%, #262626 100%);
          background-size: 20px 20px;
        }

        .category-image-wrapper :global(.category-image) {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .category-card:hover .category-image-wrapper :global(.category-image) {
          transform: scale(1.1);
        }

        .category-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding: 2.5rem;
            transition: background 0.3s ease;
        }

        .category-name {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-align: center;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .explore-btn {
            color: white;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            padding: 0.5rem 0;
            border-bottom: 2px solid #3b82f6;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
        }

        .category-card:hover .explore-btn {
            opacity: 1;
            transform: translateY(0);
        }

        @media (max-width: 768px) {
          .category-image-wrapper {
            height: 360px;
          }

          .category-name {
            font-size: 1.25rem;
          }

          .explore-btn {
              opacity: 1;
              transform: translateY(0);
          }
        }
      `}</style>
    </Link>
  );
}
