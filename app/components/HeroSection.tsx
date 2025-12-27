'use client';

import Link from 'next/link';
import { HeroContent } from '../types';

interface HeroSectionProps {
    content: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
    return (
        <section className="hero">
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1 className="hero-title">{content.title}</h1>
                    <p className="hero-subtitle">{content.subtitle}</p>
                    <Link href={content.ctaLink} className="hero-cta">
                        {content.ctaText}
                    </Link>
                </div>
            </div>

            <style jsx>{`
        .hero {
          position: relative;
          height: 600px;
          background-image: url('${content.backgroundImage}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-content {
          text-align: center;
          z-index: 1;
          max-width: 800px;
          padding: 2rem;
        }

        .hero-title {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 3.5rem;
          font-weight: 400;
          color: white;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 2rem 0;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta {
          display: inline-block;
          background-color: #3b82f6;
          color: white;
          padding: 0.875rem 2rem;
          text-decoration: none;
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 0.9375rem;
          font-weight: 500;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }

        .hero-cta:hover {
          background-color: #2563eb;
        }

        @media (max-width: 768px) {
          .hero {
            height: 500px;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 0.9rem;
          }
        }
      `}</style>
        </section>
    );
}
