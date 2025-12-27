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
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="category-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </div>
            <h3 className="category-name">{category.name}</h3>

            <style jsx>{`
        .category-card {
          display: block;
          text-decoration: none;
          border-radius: 12px;
          overflow: hidden;
          background-color: #2a2f3e;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
        }

        .category-image-wrapper {
          position: relative;
          width: 100%;
          height: 280px;
          background-color: #f5f5f5;
        }

        .category-image-wrapper :global(.category-image) {
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .category-card:hover .category-image-wrapper :global(.category-image) {
          transform: scale(1.05);
        }

        .category-name {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          text-align: center;
          padding: 1.25rem;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .category-image-wrapper {
            height: 220px;
          }

          .category-name {
            font-size: 1rem;
            padding: 1rem;
          }
        }
      `}</style>
        </Link>
    );
}
