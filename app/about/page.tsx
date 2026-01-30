'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { History, Heart, Gem, Globe, Sparkles, Award, Users, TrendingUp } from 'lucide-react';

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const elements = document.querySelectorAll('.observe-me');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-page">
            {/* Hero Section with Parallax */}
            <section className="hero-section" ref={heroRef}>
                <div className="hero-background">
                    <Image
                        src="/images/hero-background.jpg"
                        alt="AK Jewelry Craftsmanship"
                        fill
                        className="hero-image"
                        priority
                    />
                    <div className="hero-overlay" />
                    <div className="hero-gradient" />
                </div>

                <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>Est. 2024</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="title-line">Where Heritage</span>
                        <span className="title-line delay-1">Meets Luxury</span>
                    </h1>
                    <p className="hero-subtitle">
                        Crafting timeless Ethiopian jewelry that celebrates your unique story and enduring elegance
                    </p>
                </div>

                <div className="scroll-indicator">
                    <div className="scroll-line" />
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section observe-me">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content">
                            <div className="section-label">Our Journey</div>
                            <h2 className="section-title">Crafting Excellence Since 2024</h2>
                            <div className="story-text">
                                <p>
                                    Born from a profound appreciation for Ethiopian heritage and the timeless art of jewelry making, AK Jewelry represents the perfect fusion of tradition and contemporary elegance.
                                </p>
                                <p>
                                    Each piece we create is more than an accessory—it's a narrative woven in precious metals and gemstones, telling stories of culture, passion, and uncompromising craftsmanship.
                                </p>
                                <p>
                                    Our master artisans employ centuries-old techniques passed down through generations, combined with modern design sensibilities to create jewelry that transcends time and trends.
                                </p>
                            </div>
                            <div className="story-features">
                                <div className="feature-item">
                                    <Award className="feature-icon" />
                                    <div>
                                        <div className="feature-title">Award-Winning Design</div>
                                        <div className="feature-desc">Recognized for excellence</div>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <Users className="feature-icon" />
                                    <div>
                                        <div className="feature-title">Master Artisans</div>
                                        <div className="feature-desc">Decades of experience</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="story-images">
                            <div className="image-card primary">
                                <Image
                                    src="/images/necklace-category.jpg"
                                    alt="Artisan crafting jewelry"
                                    fill
                                    className="card-image"
                                />
                                <div className="image-overlay" />
                            </div>
                            <div className="image-card secondary">
                                <Image
                                    src="/images/earrings-category.jpg"
                                    alt="Jewelry detail"
                                    fill
                                    className="card-image"
                                />
                                <div className="image-overlay" />
                            </div>
                            <div className="floating-badge">
                                <TrendingUp size={20} />
                                <span>Premium Quality</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section observe-me" ref={valuesRef}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">What Drives Us</div>
                        <h2 className="section-title">Our Core Values</h2>
                        <p className="section-description">
                            The principles that guide every piece we create
                        </p>
                    </div>
                    <div className="values-grid">
                        {[
                            {
                                icon: <History size={28} />,
                                title: "Heritage",
                                desc: "Deeply rooted in the ancient artistry and cultural richness of Ethiopia, preserving traditions for future generations.",
                                color: "#3b82f6"
                            },
                            {
                                icon: <Gem size={28} />,
                                title: "Quality",
                                desc: "Uncompromising standards using only the finest materials, precious metals, and ethically sourced gemstones.",
                                color: "#8b5cf6"
                            },
                            {
                                icon: <Heart size={28} />,
                                title: "Passion",
                                desc: "Every piece is crafted with dedication, love, and meticulous attention to detail that you can feel.",
                                color: "#ec4899"
                            },
                            {
                                icon: <Globe size={28} />,
                                title: "Integrity",
                                desc: "Committed to ethical practices, sustainable sourcing, and making a positive impact on our community.",
                                color: "#10b981"
                            }
                        ].map((val, i) => (
                            <div key={i} className="value-card" style={{ '--card-color': val.color } as React.CSSProperties}>
                                <div className="value-icon-wrapper">
                                    <div className="value-icon">{val.icon}</div>
                                    <div className="icon-glow" />
                                </div>
                                <h3 className="value-title">{val.title}</h3>
                                <p className="value-desc">{val.desc}</p>
                                <div className="value-accent" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline-section observe-me" ref={timelineRef}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">Our Journey</div>
                        <h2 className="section-title">Milestones of Excellence</h2>
                    </div>
                    <div className="timeline">
                        {[
                            { year: "2024", title: "The Beginning", desc: "AK Jewelry was founded with a vision to celebrate Ethiopian heritage through luxury jewelry" },
                            { year: "2024", title: "First Collection", desc: "Launched our signature collection, blending traditional Ethiopian designs with modern aesthetics" },
                            { year: "2024", title: "Artisan Partnership", desc: "Partnered with master Ethiopian artisans to preserve and elevate traditional craftsmanship" },
                            { year: "2025", title: "Global Recognition", desc: "Expanding our reach while staying true to our roots and commitment to excellence" }
                        ].map((item, i) => (
                            <div key={i} className="timeline-item">
                                <div className="timeline-marker">
                                    <div className="marker-dot" />
                                    <div className="marker-pulse" />
                                </div>
                                <div className="timeline-content">
                                    <div className="timeline-year">{item.year}</div>
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <p className="timeline-desc">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section observe-me">
                <div className="cta-container">
                    <div className="cta-background">
                        <div className="cta-orb orb-1" />
                        <div className="cta-orb orb-2" />
                        <div className="cta-orb orb-3" />
                    </div>
                    <div className="cta-content">
                        <h2 className="cta-title">Begin Your Legacy Today</h2>
                        <p className="cta-subtitle">
                            Discover our exquisite collections and find the perfect piece that resonates with your unique story
                        </p>
                        <div className="cta-buttons">
                            <Link href="/shop" className="cta-button primary">
                                Explore Collections
                                <span className="button-shine" />
                            </Link>
                            <Link href="/contact" className="cta-button secondary">
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .about-page {
                    background-color: #0a0a0a;
                    min-height: 100vh;
                    overflow-x: hidden;
                }

                /* Hero Section */
                .hero-section {
                    position: relative;
                    height: 100vh;
                    min-height: 800px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .hero-background {
                    position: absolute;
                    inset: 0;
                }

                .hero-image {
                    object-fit: cover;
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
                        rgba(10, 10, 10, 0.3) 0%,
                        rgba(10, 10, 10, 0.7) 50%,
                        rgba(10, 10, 10, 0.95) 100%
                    );
                }

                .hero-gradient {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        circle at 50% 50%,
                        rgba(59, 130, 246, 0.1) 0%,
                        transparent 70%
                    );
                }

                .hero-content {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    max-width: 1200px;
                    padding: 2rem;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .hero-content.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    border-radius: 50px;
                    color: #3b82f6;
                    font-size: 0.875rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    margin-bottom: 2rem;
                    backdrop-filter: blur(10px);
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                .hero-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 5.5rem;
                    font-weight: 900;
                    color: white;
                    margin: 0 0 2rem 0;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .title-line {
                    display: block;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .title-line.delay-1 {
                    animation-delay: 0.2s;
                }

                @keyframes slideUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .hero-subtitle {
                    font-size: 1.375rem;
                    color: rgba(255, 255, 255, 0.8);
                    max-width: 800px;
                    margin: 0 auto 4rem;
                    line-height: 1.8;
                    font-weight: 400;
                }

                .scroll-indicator {
                    position: absolute;
                    bottom: 3rem;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10;
                }

                .scroll-line {
                    width: 2px;
                    height: 60px;
                    background: linear-gradient(
                        to bottom,
                        transparent,
                        #3b82f6,
                        transparent
                    );
                    animation: scrollPulse 2s ease-in-out infinite;
                }

                @keyframes scrollPulse {
                    0%, 100% { opacity: 0.3; transform: scaleY(1); }
                    50% { opacity: 1; transform: scaleY(1.2); }
                }

                /* Story Section */
                .story-section {
                    padding: 10rem 2rem;
                    background: linear-gradient(to bottom, #0a0a0a 0%, #0f0f0f 100%);
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .story-section.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .section-label {
                    display: inline-block;
                    padding: 0.5rem 1.25rem;
                    background: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    border-radius: 50px;
                    color: #3b82f6;
                    font-size: 0.875rem;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 1.5rem;
                }

                .section-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 3.5rem;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                }

                .story-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: center;
                }

                .story-content {
                    padding-right: 2rem;
                }

                .story-text {
                    margin: 2.5rem 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .story-text p {
                    font-size: 1.125rem;
                    line-height: 1.9;
                    color: rgba(255, 255, 255, 0.7);
                    margin: 0;
                }

                .story-features {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    margin-top: 3rem;
                }

                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                    padding: 1.5rem;
                    background: rgba(20, 20, 20, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 16px;
                    transition: all 0.3s ease;
                }

                .feature-item:hover {
                    background: rgba(59, 130, 246, 0.05);
                    border-color: rgba(59, 130, 246, 0.2);
                    transform: translateX(10px);
                }

                .feature-icon {
                    color: #3b82f6;
                    flex-shrink: 0;
                }

                .feature-title {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.25rem;
                }

                .feature-desc {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .story-images {
                    position: relative;
                    height: 600px;
                }

                .image-card {
                    position: absolute;
                    border-radius: 24px;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .image-card:hover {
                    transform: scale(1.05);
                    border-color: rgba(59, 130, 246, 0.3);
                    box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3);
                }

                .image-card.primary {
                    width: 70%;
                    height: 450px;
                    top: 0;
                    left: 0;
                    z-index: 2;
                }

                .image-card.secondary {
                    width: 55%;
                    height: 350px;
                    bottom: 0;
                    right: 0;
                    z-index: 1;
                }

                .card-image {
                    object-fit: cover;
                }

                .image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        to top,
                        rgba(10, 10, 10, 0.4) 0%,
                        transparent 50%
                    );
                }

                .floating-badge {
                    position: absolute;
                    top: 50%;
                    right: -10%;
                    transform: translateY(-50%);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1.25rem 2rem;
                    background: rgba(20, 20, 20, 0.9);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    border-radius: 16px;
                    color: white;
                    font-weight: 600;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                    z-index: 3;
                    animation: float 3s ease-in-out infinite;
                }

                .floating-badge svg {
                    color: #3b82f6;
                }

                /* Values Section */
                .values-section {
                    padding: 10rem 2rem;
                    background: #0a0a0a;
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .values-section.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 5rem;
                }

                .section-description {
                    font-size: 1.25rem;
                    color: rgba(255, 255, 255, 0.6);
                    max-width: 600px;
                    margin: 0 auto;
                }

                .values-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 2rem;
                }

                .value-card {
                    position: relative;
                    padding: 3rem 2rem;
                    background: rgba(20, 20, 20, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                }

                .value-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: var(--card-color);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .value-card:hover {
                    background: rgba(20, 20, 20, 0.8);
                    border-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-10px);
                }

                .value-card:hover::before {
                    transform: scaleX(1);
                }

                .value-icon-wrapper {
                    position: relative;
                    width: 70px;
                    height: 70px;
                    margin-bottom: 2rem;
                }

                .value-icon {
                    position: relative;
                    width: 70px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(10, 10, 10, 0.8);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    color: var(--card-color);
                    transition: all 0.4s ease;
                    z-index: 2;
                }

                .value-card:hover .value-icon {
                    transform: scale(1.1) rotate(5deg);
                    border-color: var(--card-color);
                }

                .icon-glow {
                    position: absolute;
                    inset: -10px;
                    background: var(--card-color);
                    border-radius: 20px;
                    opacity: 0;
                    filter: blur(20px);
                    transition: opacity 0.4s ease;
                    z-index: 1;
                }

                .value-card:hover .icon-glow {
                    opacity: 0.3;
                }

                .value-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 1rem;
                }

                .value-desc {
                    font-size: 1rem;
                    line-height: 1.7;
                    color: rgba(255, 255, 255, 0.6);
                    margin: 0;
                }

                .value-accent {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(
                        circle at center,
                        var(--card-color),
                        transparent 70%
                    );
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                }

                .value-card:hover .value-accent {
                    opacity: 0.1;
                }

                /* Timeline Section */
                .timeline-section {
                    padding: 10rem 2rem;
                    background: linear-gradient(to bottom, #0a0a0a 0%, #0f0f0f 100%);
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .timeline-section.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .timeline {
                    position: relative;
                    max-width: 900px;
                    margin: 0 auto;
                    padding-left: 4rem;
                }

                .timeline::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: linear-gradient(
                        to bottom,
                        transparent,
                        rgba(59, 130, 246, 0.5),
                        transparent
                    );
                }

                .timeline-item {
                    position: relative;
                    margin-bottom: 4rem;
                    opacity: 0;
                    transform: translateX(-30px);
                    animation: slideInTimeline 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }

                .timeline-item:nth-child(1) { animation-delay: 0.1s; }
                .timeline-item:nth-child(2) { animation-delay: 0.2s; }
                .timeline-item:nth-child(3) { animation-delay: 0.3s; }
                .timeline-item:nth-child(4) { animation-delay: 0.4s; }

                @keyframes slideInTimeline {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .timeline-marker {
                    position: absolute;
                    left: -4rem;
                    top: 0;
                    width: 20px;
                    height: 20px;
                }

                .marker-dot {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    background: #3b82f6;
                    border: 3px solid #0a0a0a;
                    border-radius: 50%;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 2;
                }

                .marker-pulse {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: rgba(59, 130, 246, 0.3);
                    border-radius: 50%;
                    animation: pulse 2s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.5); opacity: 0; }
                }

                .timeline-content {
                    padding: 2rem;
                    background: rgba(20, 20, 20, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    transition: all 0.3s ease;
                }

                .timeline-content:hover {
                    background: rgba(20, 20, 20, 0.8);
                    border-color: rgba(59, 130, 246, 0.3);
                    transform: translateX(10px);
                }

                .timeline-year {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    border-radius: 8px;
                    color: #3b82f6;
                    font-size: 0.875rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                }

                .timeline-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.75rem;
                }

                .timeline-desc {
                    font-size: 1rem;
                    line-height: 1.7;
                    color: rgba(255, 255, 255, 0.6);
                    margin: 0;
                }

                /* CTA Section */
                .cta-section {
                    padding: 10rem 2rem;
                    background: #0a0a0a;
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .cta-section.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }

                .cta-container {
                    position: relative;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 6rem 4rem;
                    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                    border-radius: 32px;
                    overflow: hidden;
                }

                .cta-background {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .cta-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.3;
                    animation: orbFloat 10s ease-in-out infinite;
                }

                .orb-1 {
                    width: 400px;
                    height: 400px;
                    background: rgba(255, 255, 255, 0.2);
                    top: -200px;
                    right: -100px;
                }

                .orb-2 {
                    width: 300px;
                    height: 300px;
                    background: rgba(139, 92, 246, 0.3);
                    bottom: -150px;
                    left: -100px;
                    animation-delay: 2s;
                }

                .orb-3 {
                    width: 250px;
                    height: 250px;
                    background: rgba(236, 72, 153, 0.2);
                    top: 50%;
                    left: 50%;
                    animation-delay: 4s;
                }

                @keyframes orbFloat {
                    0%, 100% { transform: translate(0, 0); }
                    33% { transform: translate(30px, -30px); }
                    66% { transform: translate(-30px, 30px); }
                }

                .cta-content {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                }

                .cta-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 4rem;
                    font-weight: 900;
                    color: white;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                    letter-spacing: -0.02em;
                }

                .cta-subtitle {
                    font-size: 1.375rem;
                    color: rgba(255, 255, 255, 0.9);
                    max-width: 700px;
                    margin: 0 auto 3rem;
                    line-height: 1.7;
                }

                .cta-buttons {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .cta-button {
                    position: relative;
                    padding: 1.25rem 3rem;
                    font-size: 1.125rem;
                    font-weight: 700;
                    border-radius: 16px;
                    text-decoration: none;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                }

                .cta-button.primary {
                    background: white;
                    color: #1e3a8a;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                }

                .cta-button.primary:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                }

                .button-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.3),
                        transparent
                    );
                    transition: left 0.5s ease;
                }

                .cta-button.primary:hover .button-shine {
                    left: 100%;
                }

                .cta-button.secondary {
                    background: transparent;
                    color: white;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }

                .cta-button.secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: white;
                    transform: translateY(-4px);
                }

                /* Responsive Design */
                @media (max-width: 1200px) {
                    .values-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .story-grid {
                        gap: 4rem;
                    }
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 3.5rem;
                    }

                    .section-title {
                        font-size: 2.5rem;
                    }

                    .story-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }

                    .story-content {
                        padding-right: 0;
                    }

                    .story-images {
                        height: 500px;
                    }

                    .floating-badge {
                        right: 5%;
                    }

                    .values-grid {
                        grid-template-columns: 1fr;
                    }

                    .timeline {
                        padding-left: 3rem;
                    }

                    .timeline-marker {
                        left: -3rem;
                    }

                    .cta-title {
                        font-size: 2.5rem;
                    }

                    .cta-container {
                        padding: 4rem 2rem;
                    }

                    .cta-buttons {
                        flex-direction: column;
                        align-items: stretch;
                    }
                }

                @media (max-width: 640px) {
                    .hero-section {
                        min-height: 700px;
                    }

                    .hero-title {
                        font-size: 2.5rem;
                    }

                    .hero-subtitle {
                        font-size: 1.125rem;
                    }

                    .section-title {
                        font-size: 2rem;
                    }

                    .story-section,
                    .values-section,
                    .timeline-section,
                    .cta-section {
                        padding: 5rem 1.5rem;
                    }

                    .image-card.primary {
                        width: 85%;
                        height: 350px;
                    }

                    .image-card.secondary {
                        width: 70%;
                        height: 280px;
                    }

                    .floating-badge {
                        font-size: 0.875rem;
                        padding: 1rem 1.5rem;
                    }

                    .cta-title {
                        font-size: 2rem;
                    }

                    .cta-subtitle {
                        font-size: 1.125rem;
                    }
                }

                /* Animation Classes */
                .observe-me {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .observe-me.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </div>
    );
}