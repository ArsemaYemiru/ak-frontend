'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { ShoppingBag, ChevronLeft, Sparkles, Check } from 'lucide-react';

export default function ProductDetailPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);
    const { items, addItem } = useCartStore();
    const isInCart = product ? items.some(item => item.id === product.id) : false;

    useEffect(() => {
        const fetchProduct = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
            const type = searchParams.get('type') || 'jeweleries';

            const getStrapiURL = (path: string = '') => {
                return `${apiUrl}${path.startsWith('/') ? path : `/${path}`}`;
            };

            const getImageUrl = (image: any) => {
                if (!image) return null;
                if (image.url.startsWith('http')) return image.url;
                return getStrapiURL(image.url);
            };

            try {
                // Try fetching by ID first
                let res = await fetch(`${apiUrl}/api/${type}/${id}?populate=*`);
                let data = await res.json();

                // If not found, try filtering by slug
                if (!res.ok || !data.data) {
                    const slugRes = await fetch(`${apiUrl}/api/${type}?filters[slug][$eq]=${id}&populate=*`);
                    const slugData = await slugRes.json();
                    if (slugData.data && slugData.data.length > 0) {
                        data = { data: slugData.data[0] };
                    } else {
                        setLoading(false);
                        return;
                    }
                }

                if (data.data) {
                    const p = data.data;
                    setProduct({
                        id: p.id.toString(),
                        name: p.name || 'Exquisite Jewelry',
                        price: p.price || 0,
                        description: p.description || 'Handcrafted with precision and care, this piece embodies the rich heritage of Ethiopian craftsmanship.',
                        material: p.material || 'Premium Materials',
                        image: (p.images?.[0] ? getImageUrl(p.images[0]) : null) || (
                            type.includes('necklace') ? '/images/necklace-category.jpg' :
                                type.includes('earring') ? '/images/earrings-category.jpg' :
                                    type.includes('bracelet') ? '/images/bracelet-category.jpg' :
                                        '/images/ring-category.jpg'
                        ),
                        type: type,
                    });
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, searchParams]);

    const handleAddToCart = () => {
        if (!isInCart) {
            addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
            // Optional: temporary feedback if needed, but per request we rely on persistent state
            setAddedToCart(true);
            // In this logic, as soon as it's added, 'isInCart' becomes true on next render/store update.
        }
    };

    if (loading) {
        return (
            <div className="product-detail-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading product details...</p>
                </div>

                <style jsx>{`
                    .product-detail-page {
                        background-color: var(--background);
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .loading-container {
                        text-align: center;
                        color: var(--foreground);
                        opacity: 0.6;
                    }

                    .spinner {
                        width: 40px;
                        height: 40px;
                        border: 3px solid rgba(212, 175, 55, 0.2);
                        border-top-color: #d4af37;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 1rem;
                    }

                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
            `}</style>
            </div >
        );
    }

    if (!product) {
        return (
            <div className="product-detail-page">
                <div className="not-found">
                    <h1>Product Not Found</h1>
                    <p>The product you're looking for doesn't exist.</p>
                    <Link href="/shop" className="back-link">Browse All Products</Link>
                </div>

                <style jsx>{`
                    .product-detail-page {
                        background-color: var(--background);
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem;
                    }

                    .not-found {
                        text-align: center;
                        color: var(--foreground);
                    }

                    .not-found h1 {
                        font-family: var(--font-noto-serif-ethiopic), serif;
                        font-size: 2.5rem;
                        margin-bottom: 1rem;
                    }

                    .not-found p {
                        color: var(--foreground);
                        opacity: 0.6;
                        margin-bottom: 2rem;
                    }

                    .back-link {
                        display: inline-block;
                        padding: 1rem 2rem;
                        background: #d4af37;
                        color: white;
                        text-decoration: none;
                        border-radius: 12px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }

                    .back-link:hover {
                        background: #c19b2e;
                        transform: translateY(-2px);
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="container">
                <button onClick={() => router.back()} className="back-button">
                    <ChevronLeft size={20} />
                    <span>Back</span>
                </button>

                <div className="product-grid">
                    {/* Product Image */}
                    <div className="image-section">
                        <div className="image-wrapper">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="product-image"
                                    priority
                                />
                            ) : (
                                <div className="product-image-placeholder" />
                            )}
                            <div className="image-badge">
                                <Sparkles size={16} />
                                <span>Premium</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="details-section">
                        <div className="details-content">
                            <h1 className="product-title">{product.name}</h1>
                            <p className="product-price">{product.price.toLocaleString()} Birr</p>

                            <div className="divider"></div>

                            <div className="description-section">
                                <h3 className="section-label">Description</h3>
                                <p className="product-description">{product.description}</p>
                            </div>

                            {product.material && (
                                <div className="material-section">
                                    <h3 className="section-label">Material</h3>
                                    <p className="material-text">{product.material}</p>
                                </div>
                            )}

                            <div className="features">
                                <div className="feature-item">
                                    <Check size={18} />
                                    <span>Handcrafted</span>
                                </div>
                                <div className="feature-item">
                                    <Check size={18} />
                                    <span>Authentic</span>
                                </div>
                                <div className="feature-item">
                                    <Check size={18} />
                                    <span>Premium Quality</span>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className={`add-to-cart-btn ${isInCart || addedToCart ? 'added' : ''}`}
                                disabled={isInCart || addedToCart}
                            >
                                {isInCart || addedToCart ? (
                                    <>
                                        <Check size={20} />
                                        <span>Added to Cart!</span>
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag size={20} />
                                        <span>Add to Cart</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .product-detail-page {
                    background-color: var(--background);
                    min-height: 100vh;
                    padding: 8rem 2rem 4rem;
                }

                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .back-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--foreground);
                    opacity: 0.6;
                    background: transparent;
                    border: none;
                    font-size: 0.9375rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-bottom: 3rem;
                    padding: 0.5rem 0;
                }

                .back-button:hover {
                    opacity: 1;
                    color: var(--foreground);
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: start;
                }

                /* Image Section */
                .image-section {
                    position: sticky;
                    top: 120px;
                }

                .image-wrapper {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 1;
                    border-radius: 24px;
                    overflow: hidden;
                    background: var(--background);
                    border: 1px solid var(--header-border);
                }

                .image-wrapper :global(.product-image) {
                    object-fit: cover;
                }

                .product-image-placeholder {
                    width: 100%;
                    height: 100%;
                    background-color: #1a1a1a;
                    background-image: linear-gradient(45deg, #1a1a1a 25%, #262626 25%, #262626 50%, #1a1a1a 50%, #1a1a1a 75%, #262626 75%, #262626 100%);
                    background-size: 20px 20px;
                }

                .image-badge {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    background: rgba(212, 175, 55, 0.9);
                    backdrop-filter: blur(10px);
                    border-radius: 50px;
                    color: white;
                    font-size: 0.875rem;
                    font-weight: 600;
                }

                /* Details Section */
                .details-section {
                    padding: 2rem 0;
                }

                .details-content {
                    max-width: 600px;
                }

                .product-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 3rem;
                    font-weight: 900;
                    color: var(--foreground);
                    line-height: 1.2;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                }

                .product-price {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #d4af37;
                    margin-bottom: 2rem;
                }

                .divider {
                    height: 1px;
                    background: var(--header-border);
                    margin: 2rem 0;
                }

                .section-label {
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: var(--foreground);
                    opacity: 0.5;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 1rem;
                }

                .description-section {
                    margin-bottom: 2rem;
                }

                .product-description {
                    font-size: 1.125rem;
                    line-height: 1.8;
                    color: var(--foreground);
                    opacity: 0.8;
                }

                .material-section {
                    margin-bottom: 2rem;
                }

                .material-text {
                    font-size: 1rem;
                    color: var(--foreground);
                    opacity: 0.7;
                    font-weight: 500;
                }

                .features {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 3rem;
                }

                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    background: var(--background);
                    border: 1px solid var(--header-border);
                    border-radius: 50px;
                    color: var(--foreground);
                    opacity: 0.8;
                    font-size: 0.9375rem;
                }

                .add-to-cart-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    width: 100%;
                    padding: 1.25rem 2rem;
                    background: #d4af37;
                    color: white;
                    border: none;
                    border-radius: 16px;
                    font-size: 1.125rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
                }

                .add-to-cart-btn:hover:not(:disabled) {
                    background: #c19b2e;
                    transform: translateY(-2px);
                    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
                }

                .add-to-cart-btn.added {
                    background: #10b981;
                    cursor: default;
                }

                .add-to-cart-btn:disabled {
                    cursor: not-allowed;
                }

                /* Responsive */
                @media (max-width: 968px) {
                    .product-grid {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }

                    .image-section {
                        position: relative;
                        top: 0;
                    }

                    .product-title {
                        font-size: 2rem;
                    }

                    .product-price {
                        font-size: 1.5rem;
                    }

                    .details-content {
                        max-width: 100%;
                    }
                }

                @media (max-width: 640px) {
                    .product-detail-page {
                        padding: 6rem 1.5rem 3rem;
                    }

                    .product-title {
                        font-size: 1.75rem;
                    }

                    .product-description {
                        font-size: 1rem;
                    }

                    .add-to-cart-btn {
                        font-size: 1rem;
                        padding: 1rem 1.5rem;
                    }
                }
            `}</style>
        </div >
    );
}
