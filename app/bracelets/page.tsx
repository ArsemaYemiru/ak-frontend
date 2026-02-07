'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function BraceletsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        const fetchData = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

            const getStrapiURL = (path: string = '') => {
                return `${apiUrl}${path.startsWith('/') ? path : `/${path}`}`;
            };

            const getImageUrl = (image: any) => {
                if (!image) return null;
                if (image.url.startsWith('http')) return image.url;
                return getStrapiURL(image.url);
            };

            try {
                const response = await fetch(`${apiUrl}/api/bracelets?filters[isActive][$ne]=false&populate=*`);
                const data = await response.json();

                if (data.data) {
                    const formattedProducts = data.data.map((p: any) => {
                        const prodImage = p.images?.[0];
                        return {
                            id: p.id.toString(),
                            name: p.name,
                            price: p.price,
                            image: (prodImage ? getImageUrl(prodImage) : null) || '/images/bracelet-category.jpg',
                            link: `/product/${p.slug || p.id}?type=bracelets`,
                        };
                    });
                    setProducts(formattedProducts);
                }
            } catch (error) {
                console.error('Error fetching bracelets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="category-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background" />
                <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>Premium Collection</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="title-line">Elegant</span>
                        <span className="title-line delay-1">Bracelets</span>
                    </h1>
                    <p className="hero-subtitle">
                        Grace your wrist with our handcrafted bracelets, blending Ethiopian tradition with modern elegance
                    </p>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <ChevronRight size={16} />
                        <span>Bracelets</span>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <h2 className="section-title">Our Bracelet Collection</h2>
                            <p className="section-subtitle">
                                {loading ? 'Loading...' : `${products.length} exquisite pieces`}
                            </p>
                        </div>
                    </div>

                    <div className="products-container">
                        {loading ? (
                            <div className="loading-state">
                                <Loader2 className="spinner" size={40} />
                                <p>Curating the finest pieces...</p>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="products-grid">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <Sparkles size={48} className="empty-icon" />
                                <h3>New Treasures Coming Soon</h3>
                                <p>Our artisans are crafting new masterpieces. Check back shortly!</p>
                                <Link href="/shop" className="browse-link">
                                    Browse All Collections
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <style jsx>{`
                .category-page {
                    background-color: var(--background);
                    min-height: 100vh;
                }

                /* Hero Section */
                .hero-section {
                    position: relative;
                    height: 70vh;
                    min-height: 500px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    margin-bottom: 6rem;
                }

                .hero-background {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #d4af37 0%, #3b82f6 50%, #d4af37 100%);
                    opacity: 0.15;
                }

                .hero-background::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 70% 50%, rgba(212, 175, 55, 0.2) 0%, transparent 50%);
                    animation: pulse 8s ease-in-out infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }

                .hero-content {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    max-width: 900px;
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
                    background: rgba(212, 175, 55, 0.1);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    border-radius: 50px;
                    color: #d4af37;
                    font-size: 0.875rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    margin-bottom: 2rem;
                    backdrop-filter: blur(10px);
                }

                .hero-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 5rem;
                    font-weight: 900;
                    color: var(--foreground);
                    margin: 0 0 1.5rem 0;
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
                    font-size: 1.25rem;
                    color: var(--foreground);
                    opacity: 0.7;
                    max-width: 600px;
                    margin: 0 auto 2rem;
                    line-height: 1.8;
                }

                .breadcrumb {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1.5rem;
                    background: var(--dropdown-bg);
                    border: 1px solid var(--dropdown-border);
                    border-radius: 50px;
                    backdrop-filter: blur(20px);
                    font-size: 0.875rem;
                    color: var(--foreground);
                    opacity: 0.6;
                }

                .breadcrumb :global(a) {
                    color: #d4af37;
                    transition: color 0.3s ease;
                }

                .breadcrumb :global(a:hover) {
                    color: #c19b2e;
                }

                /* Products Section */
                .products-section {
                    padding: 0 2rem 8rem;
                }

                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 4rem;
                }

                .section-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: var(--foreground);
                    margin-bottom: 0.5rem;
                }

                .section-subtitle {
                    color: var(--foreground);
                    opacity: 0.5;
                    font-size: 1rem;
                }

                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 2.5rem;
                }

                .loading-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 100px 0;
                    color: var(--foreground);
                    opacity: 0.4;
                    gap: 1.5rem;
                }

                .spinner {
                    animation: spin 1s linear infinite;
                    color: #d4af37;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 100px 2rem;
                    text-align: center;
                }

                .empty-icon {
                    color: #d4af37;
                    margin-bottom: 2rem;
                    opacity: 0.5;
                }

                .empty-state h3 {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 2rem;
                    color: var(--foreground);
                    margin-bottom: 1rem;
                }

                .empty-state p {
                    color: var(--foreground);
                    opacity: 0.5;
                    font-size: 1.125rem;
                    margin-bottom: 2rem;
                    max-width: 500px;
                }

                .browse-link {
                    display: inline-block;
                    padding: 1rem 2.5rem;
                    background: #d4af37;
                    color: white;
                    border-radius: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .browse-link:hover {
                    background: #c19b2e;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .products-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .hero-section {
                        height: 60vh;
                        min-height: 400px;
                        margin-bottom: 4rem;
                    }

                    .hero-title {
                        font-size: 3rem;
                    }

                    .hero-subtitle {
                        font-size: 1rem;
                    }

                    .section-title {
                        font-size: 2rem;
                    }

                    .products-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .products-section {
                        padding: 0 1.5rem 5rem;
                    }
                }

                @media (max-width: 640px) {
                    .hero-section {
                        height: 50vh;
                        min-height: 350px;
                    }

                    .hero-title {
                        font-size: 2.5rem;
                    }

                    .hero-subtitle {
                        font-size: 0.9375rem;
                        padding: 0 1rem;
                    }

                    .hero-badge {
                        font-size: 0.75rem;
                        padding: 0.5rem 1rem;
                    }

                    .section-header {
                        margin-bottom: 2rem;
                    }

                    .section-title {
                        font-size: 1.75rem;
                    }

                    .products-section {
                        padding: 0 1rem 4rem;
                    }
                }
            `}</style>
        </div>
    );
}
