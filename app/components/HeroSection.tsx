'use client';

import Link from 'next/link';
import { HeroContent } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  content: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero-background" style={{ backgroundImage: `url('${content.backgroundImage}')` }} />
      <div className="hero-overlay">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-overlay animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] pointer-events-none mix-blend-overlay animate-pulse delay-1000" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }} />

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="block">{content.title}</span>
          </h1>
          <p className="hero-subtitle">{content.subtitle}</p>
          <div className="cta-wrapper">
            <Link href={content.ctaLink} className="hero-cta group relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 transition-all duration-300 group-hover:opacity-90" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #d4af37)' }} />
              <div className="relative flex items-center justify-center gap-2">
                <span>{content.ctaText}</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
              </div>
            </Link>
          </div>
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
              rgba(5, 5, 5, 0.3) 0%,
              rgba(5, 5, 5, 0.6) 50%,
              rgba(5, 5, 5, 0.95) 100%
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
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50px;
            color: #fff;
            font-size: 0.875rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            margin-bottom: 2rem;
            text-transform: uppercase;
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
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 auto 3rem;
          line-height: 1.8;
          max-width: 700px;
          font-weight: 400;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          padding: 1.25rem 3rem;
          color: white;
          border-radius: 100px;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
        }

        .hero-cta:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(212, 175, 55, 0.5);
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
