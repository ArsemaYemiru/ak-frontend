'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2, Star, Sparkles } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

export default function NewArrivalsPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

            const getStrapiURL = (path: string = '') => {
                return `${apiUrl}${path.startsWith('/') ? path : `/${path}`}`;
            };

            const getImageUrl = (image: any) => {
                if (!image) return null; // Return null if no image, we will handle fallback in the map
                if (image.url.startsWith('http')) return image.url;
                return getStrapiURL(image.url);
            };

            const getCategoryFallback = (label: string) => {
                const l = label.toLowerCase();
                if (l.includes('necklace')) return '/images/necklace-category.jpg';
                if (l.includes('earring')) return '/images/earrings-category.jpg';
                if (l.includes('bracelet')) return '/images/bracelet-category.jpg';
                return '/images/ring-category.jpg';
            };

            const getProductFallback = (index: number) => `/images/product-${(index % 4) + 1}.jpg`;

            // Calculate 15 days ago for filtering
            const fifteenDaysAgo = new Date();
            fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
            const dateString = fifteenDaysAgo.toISOString();

            try {
                const endpoints = [
                    { path: 'jeweleries', label: 'Jewelery' },
                    { path: 'necklaces', label: 'Necklace' },
                    { path: 'earrings', label: 'Earring' },
                    { path: 'bracelets', label: 'Bracelet' }
                ];

                const results = await Promise.all(
                    endpoints.map(e => fetch(`${apiUrl}/api/${e.path}?filters[createdAt][$gte]=${dateString}&populate=*`))
                );
                const allData = await Promise.all(results.map(r => r.json()));

                let mergedProducts: any[] = [];
                let mergedCats: any[] = [];

                allData.forEach((data, index) => {
                    if (data.data && data.data.length > 0) {
                        const firstImage = data.data[0]?.images?.[0];
                        mergedCats.push({
                            id: index.toString(),
                            name: endpoints[index].label,
                            image: (firstImage ? getImageUrl(firstImage) : null) || getCategoryFallback(endpoints[index].label),
                            link: `/shop?category=${endpoints[index].label}`
                        });

                        const pros = data.data.map((p: any) => {
                            const prodImage = p.images?.[0];
                            return {
                                id: p.id.toString(),
                                name: p.name,
                                price: p.price,
                                image: (prodImage ? getImageUrl(prodImage) : null) || getCategoryFallback(endpoints[index].label),
                                link: `/product/${p.slug || p.id}?type=${endpoints[index].path}`,
                            };
                        });
                        mergedProducts = [...mergedProducts, ...pros];
                    }
                });

                // Deduplicate products by ID
                const uniqueProducts = Array.from(new Map(mergedProducts.map(item => [item.id, item])).values());
                setProducts(uniqueProducts);
                setCategories(mergedCats);
            } catch (error) {
                console.error('Error fetching arrivals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="new-arrivals-page relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

            <div className="container relative z-10">
                {/* Header Section */}
                <div className="arrivals-header">
                    <div className="badge">
                        <Sparkles size={14} className="star-icon" />
                        <span>Just In</span>
                    </div>
                    <h1 className="title bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">New Arrivals</h1>
                    <p className="subtitle">Discover our latest creations, fresh from the workshop and limited in production.</p>
                </div>

                {/* Categories Grid */}
                <div className="categories-grid">
                    {categories.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </div>

                {/* Product Section */}
                <div className="products-section backdrop-blur-md bg-[#141414]/80 border border-white/[0.08]">
                    <div className="section-header">
                        <h2 className="section-title">Fresh from the Workshop</h2>
                        <Link href="/shop" className="view-all group">
                            <span>View all items</span>
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="products-container">
                        {loading ? (
                            <div className="loading-state">
                                <Loader2 className="spinner" size={40} />
                                <p>Sourcing the latest pieces...</p>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid">
                                {products.slice(0, 8).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>Our newest treasures are coming soon. Check back shortly!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .new-arrivals-page {
                    background-color: #050505;
                    min-height: 100vh;
                    padding-top: 160px;
                    padding-bottom: 100px;
                }

                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .arrivals-header {
                    text-align: center;
                    margin-bottom: 6rem;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    color: #3b82f6;
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 1.5rem;
                }

                .title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: clamp(3rem, 6vw, 5rem);
                    font-weight: 900;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                }

                .subtitle {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1.25rem;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    margin-bottom: 8rem;
                }

                .products-section {
                    padding: 4rem;
                    border-radius: 48px;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 4rem;
                }

                .section-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                }

                .view-all {
                    color: #3b82f6;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-decoration: none !important;
                    transition: color 0.3s ease;
                }

                .view-all:hover {
                    color: #60a5fa;
                }

                .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 2.5rem;
                }

                .loading-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 60px 0;
                    color: rgba(255, 255, 255, 0.4);
                    gap: 1.5rem;
                }

                .spinner {
                    animation: spin 1s linear infinite;
                    color: #3b82f6;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .empty-state {
                    text-align: center;
                    padding: 60px 0;
                    color: rgba(255, 255, 255, 0.4);
                    font-style: italic;
                }

                @media (max-width: 768px) {
                    .new-arrivals-page {
                        padding-top: 120px;
                    }
                    .arrivals-header {
                        margin-bottom: 4rem;
                    }
                    .products-section {
                        padding: 2rem;
                        border-radius: 32px;
                    }
                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }
                    .grid {
                        gap: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
