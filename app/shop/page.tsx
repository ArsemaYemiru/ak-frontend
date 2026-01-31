'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';

export default function ShopPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [categories, setCategories] = useState<string[]>(['All']);

    useEffect(() => {
        const fetchData = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
            try {
                const endpoints = [
                    { path: 'necklaces', label: 'Necklace' },
                    { path: 'earrings', label: 'Earring' },
                    { path: 'bracelets', label: 'Bracelet' },
                    { path: 'rings', label: 'Rings' }
                ];

                const results = await Promise.all(
                    endpoints.map(e => fetch(`${apiUrl}/api/${e.path}?populate=*`))
                );

                const allData = await Promise.all(results.map(r => r.json()));

                const getCategoryFallback = (label: string) => {
                    const l = label.toLowerCase();
                    if (l.includes('necklace')) return '/images/necklace-category.jpg';
                    if (l.includes('earring')) return '/images/earrings-category.jpg';
                    if (l.includes('bracelet')) return '/images/bracelet-category.jpg';
                    return '/images/ring-category.jpg';
                };

                let mergedProducts: any[] = [];
                allData.forEach((data, index) => {
                    if (data.data) {
                        const pros = data.data.map((p: any) => ({
                            id: p.id.toString(),
                            name: p.name,
                            price: p.price,
                            image: p.images?.[0]?.url ? `${apiUrl}${p.images[0].url}` : getCategoryFallback(endpoints[index].label),
                            link: `/product/${p.slug || p.id}?type=${endpoints[index].path}`,
                            category: endpoints[index].label
                        }));
                        mergedProducts = [...mergedProducts, ...pros];
                    }
                });

                const uniqueProducts = Array.from(new Map(mergedProducts.map(item => [item.id, item])).values());
                setProducts(uniqueProducts);
                setCategories(['All', ...endpoints.map(e => e.label)]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter((p) => {
        const name = p.name || '';
        const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    const getTheme = () => {
        switch (category) {
            case 'Necklace': return { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)' };
            case 'Earring': return { color: '#f472b6', bg: 'rgba(244, 114, 182, 0.1)' };
            case 'Bracelet': return { color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)' };
            case 'Rings': return { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.1)' };
            default: return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
        }
    };

    const theme = getTheme();

    return (
        <div className="shop-page" suppressHydrationWarning>
            <div className="shop-container">
                {/* Header Section */}
                <div className="shop-header">
                    <h1 className="shop-title" style={{ borderLeft: `4px solid ${theme.color}`, paddingLeft: '1rem' }}>
                        {category === 'All' ? 'Our Collection' : category}
                    </h1>
                    <p className="shop-description">
                        Explore our curated selection of fine {category === 'All' ? 'jewelry' : category.toLowerCase() + 's'},
                        handcrafted to perfection and designed to elevate every moment.
                    </p>
                </div>

                {/* Filters & Search Section - Thematic Styling */}
                <div className="filter-section" style={{ borderColor: `${theme.color}20` }}>
                    <div className="search-box">
                        <Search className="search-icon" size={18} style={{ color: theme.color }} />
                        <input
                            type="text"
                            placeholder={`Search ${category === 'All' ? 'collection' : category.toLowerCase() + 's'}...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ borderColor: `${theme.color}40` }}
                        />
                    </div>

                    <div className="category-filters">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`filter-btn ${category === cat ? 'active' : ''}`}
                                style={category === cat ? { backgroundColor: theme.color, borderColor: theme.color } : {}}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="loading-state">
                        <Loader2 className="spinner" size={40} style={{ color: theme.color }} />
                        <p>Revealing our treasures...</p>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard key={`${product.category}-${product.id}`} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <SlidersHorizontal size={24} />
                        </div>
                        <h3>No items found</h3>
                        <p>Try adjusting your filters or search terms to find what you're looking for.</p>
                        <button
                            onClick={() => { setSearch(''); setCategory('All'); }}
                            className="reset-btn"
                            style={{ color: theme.color }}
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>

            <style jsx>{`
                .shop-page {
                    background-color: #0a0a0a;
                    min-height: 100vh;
                    padding-top: 80px;
                    padding-bottom: 80px;
                }

                .shop-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .shop-header {
                    margin-bottom: 1rem;
                    text-align: left;
                }

                .theme-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .shop-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 800;
                    color: white;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                    transition: border-color 0.3s ease;
                }

                .shop-description {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1.125rem;
                    max-width: 600px;
                    line-height: 1.6;
                }

                .filter-section {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    margin-bottom: 4rem;
                    background-color: #141414;
                    padding: 2rem;
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;
                }

                @media (min-width: 1024px) {
                    .filter-section {
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                    }
                }

                .search-box {
                    position: relative;
                    flex: 1;
                    max-width: 500px;
                }

                .search-icon {
                    position: absolute;
                    left: 1.25rem;
                    top: 50%;
                    transform: translateY(-50%);
                    transition: color 0.3s ease;
                }

                .search-box input {
                    width: 100%;
                    background-color: #0d0d0d;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 0.875rem 1rem 0.875rem 3.5rem;
                    color: white;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                }

                .search-box input:focus {
                    outline: none;
                    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
                }

                .category-filters {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .filter-btn {
                    background-color: #0d0d0d;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.6);
                    padding: 0.75rem 1.5rem;
                    border-radius: 12px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .filter-btn:hover {
                    border-color: rgba(255, 255, 255, 0.3);
                    color: white;
                }

                .filter-btn.active {
                    color: white;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                }

                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 2.5rem;
                }

                .loading-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 100px 0;
                    color: rgba(255, 255, 255, 0.4);
                    gap: 1.5rem;
                }

                .spinner {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .empty-state {
                    text-align: center;
                    padding: 80px 0;
                    background-color: #141414;
                    border-radius: 32px;
                    border: 1px dashed rgba(255, 255, 255, 0.1);
                }

                .empty-icon {
                    width: 64px;
                    height: 64px;
                    background-color: #0d0d0d;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    color: rgba(255, 255, 255, 0.4);
                }

                .empty-state h3 {
                    color: white;
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                .empty-state p {
                    color: rgba(255, 255, 255, 0.5);
                    max-width: 400px;
                    margin: 0 auto 2rem;
                }

                .reset-btn {
                    font-weight: 700;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                }

                .reset-btn:hover {
                    text-decoration: underline;
                    opacity: 0.8;
                }

                @media (max-width: 768px) {
                    .shop-page {
                        padding-top: 120px;
                    }
                    .shop-container {
                        padding: 0 1.5rem;
                    }
                    .filter-section {
                        padding: 1.5rem;
                    }
                    .products-grid {
                        gap: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
