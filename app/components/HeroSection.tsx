'use client';

import Link from 'next/link';
import { HeroContent } from '../types';

interface HeroSectionProps {
  content: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-background" style={{ backgroundImage: `url('${content.backgroundImage}')` }} />
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
          height: 90vh;
          min-height: 700px;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-background {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            transform: scale(1.05);
            animation: slowZoom 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slowZoom {
            from { transform: scale(1); }
            to { transform: scale(1.1); }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
              to bottom,
              rgba(10, 10, 10, 0.4) 0%,
              rgba(10, 10, 10, 0.6) 50%,
              rgba(10, 10, 10, 0.9) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-content {
          text-align: center;
          z-index: 10;
          max-width: 1000px;
          padding: 2rem;
          margin-top: 5rem;
        }

        .hero-title {
          font-family: var(--font-noto-serif-ethiopic), serif;
          font-size: 5rem;
          font-weight: 900;
          color: white;
          margin: 0 0 1.5rem 0;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 auto 3rem;
          line-height: 1.8;
          max-width: 700px;
          font-weight: 400;
        }

        .hero-cta {
          display: inline-block;
          background-color: #3b82f6;
          color: white;
          padding: 1.25rem 3rem;
          text-decoration: none !important;
          font-size: 1rem;
          font-weight: 700;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }

        .hero-cta:hover {
          background-color: #2563eb;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.6);
        }

        @media (max-width: 1024px) {
            .hero-title {
                font-size: 4rem;
            }
        }

        @media (max-width: 768px) {
          .hero {
            height: 80vh;
            min-height: 600px;
          }

          .hero-title {
            font-size: 3rem;
          }

          .hero-subtitle {
            font-size: 1rem;
            margin-bottom: 2.5rem;
          }

          .hero-cta {
              padding: 1rem 2.5rem;
              font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
}
