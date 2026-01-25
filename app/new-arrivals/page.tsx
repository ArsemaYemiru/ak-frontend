'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2, Star } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

export default function NewArrivalsPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

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
                        mergedCats.push({
                            id: index.toString(),
                            name: endpoints[index].label,
                            image: data.data[0]?.images?.[0]?.url ? `${apiUrl}${data.data[0].images[0].url}` : '',
                            link: `/shop?category=${endpoints[index].label}`
                        });

                        const pros = data.data.map((p: any) => ({
                            id: p.id.toString(),
                            name: p.name,
                            price: p.price,
                            image: p.images?.[0]?.url ? `${apiUrl}${p.images[0].url}` : '',
                            link: `/product/${p.slug || p.id}?type=${endpoints[index].path}`,
                        }));
                        mergedProducts = [...mergedProducts, ...pros];
                    }
                });

                setProducts(mergedProducts);
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
        <div className="new-arrivals-page">
            <div className="container">
                {/* Header Section */}
                <div className="arrivals-header">
                    <div className="badge">
                        <Star size={14} className="star-icon" />
                        <span>Just In</span>
                    </div>
                    <h1 className="title">New Arrivals</h1>
                    <p className="subtitle">Discover our latest creations, fresh from the workshop and limited in production.</p>
                </div>

                {/* Categories Grid */}
                <div className="categories-grid">
                    {categories.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} />
                    ))}
                </div>

                {/* Product Section */}
                <div className="products-section">
                    <div className="section-header">
                        <h2 className="section-title">Fresh from the Workshop</h2>
                        <Link href="/shop" className="view-all">
                            View all items <ChevronRight size={18} />
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
                    background-color: #0a0a0a;
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
                    background-color: rgba(59, 130, 246, 0.1);
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
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: -0.02em;
                    margin-bottom: 1.5rem;
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
                    background-color: #141414;
                    padding: 4rem;
                    border-radius: 48px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
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
                    transition: gap 0.3s ease;
                    text-decoration: none !important;
                }

                .view-all:hover {
                    gap: 0.75rem;
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
