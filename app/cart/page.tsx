'use client';

import { useCartStore, useAuthStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();
    const { user } = useAuthStore();
    const router = useRouter();

    const handleCheckout = () => {
        if (!user) {
            router.push('/login?redirect=/checkout');
            return;
        }
        router.push('/checkout');
    };

    if (items.length === 0) {
        return (
            <div className="cart-page relative overflow-hidden">
                {/* Ambient Background */}
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

                <div className="empty-cart z-10 relative">
                    <div className="empty-icon-wrapper">
                        <ShoppingBag className="empty-icon text-gray-800" size={64} />
                        <Sparkles className="sparkle-icon text-purple-500" size={24} />
                    </div>
                    <h1 className="empty-title">Your Cart is Empty</h1>
                    <p className="empty-subtitle text-gray-400">
                        Discover our exquisite collection of handcrafted jewelry and find something beautiful to treasure.
                    </p>
                    <Link href="/shop" className="shop-button group relative overflow-hidden">
                        <div className="relative flex items-center gap-2">
                            <Sparkles size={20} />
                            <span>Explore Collection</span>
                        </div>
                    </Link>
                </div>

                <style jsx>{`
                    .cart-page {
                        background-color: #050505;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem;
                    }

                    .empty-cart {
                        text-align: center;
                        max-width: 500px;
                    }

                    .empty-icon-wrapper {
                        position: relative;
                        display: inline-block;
                        margin-bottom: 2rem;
                    }

                    .sparkle-icon {
                        position: absolute;
                        top: -10px;
                        right: -10px;
                        animation: sparkle 3s ease-in-out infinite;
                    }

                    @keyframes sparkle {
                        0%, 100% { opacity: 1; transform: rotate(0deg) scale(1); }
                        50% { opacity: 0.5; transform: rotate(180deg) scale(1.2); }
                    }

                    .empty-title {
                        font-family: var(--font-noto-serif-ethiopic), serif;
                        font-size: 3rem;
                        font-weight: 800;
                        margin-bottom: 1rem;
                        color: #ffffff;
                    }

                    .empty-subtitle {
                        font-size: 1.125rem;
                        line-height: 1.8;
                        margin-bottom: 2.5rem;
                    }

                    .shop-button {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.75rem;
                        padding: 1rem 2.5rem;
                        color: #ffffff;
                        background: #3b82f6;
                        border: 2px solid #3b82f6;
                        border-radius: 100px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        font-size: 0.875rem;
                        transition: all 0.3s ease;
                    }

                    .shop-button:hover {
                        background: #2563eb;
                        border-color: #2563eb;
                        box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
                    }

                    @media (max-width: 640px) {
                        .empty-title {
                            font-size: 2rem;
                        }
                    }
                `}</style>
            </div>
        );
    }

    const subtotal = getTotal();
    const total = subtotal;

    const getFallbackImage = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('necklace')) return '/images/necklace-category.jpg';
        if (n.includes('earring')) return '/images/earrings-category.jpg';
        if (n.includes('bracelet')) return '/images/bracelet-category.jpg';
        if (n.includes('ring')) return '/images/ring-category.jpg';
        return '/images/ring-category.jpg';
    };

    return (
        <div className="cart-page relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="page-header">
                    <button onClick={() => router.back()} className="back-button group">
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Continue Shopping</span>
                    </button>
                    <h1 className="page-title">Shopping Cart</h1>
                    <p className="page-subtitle text-gray-400">{items.length} {items.length === 1 ? 'item' : 'items'} ready for checkout</p>
                </div>

                <div className="cart-grid">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {items.map((item) => (
                            <div key={item.id} className="cart-item group">
                                <div className="item-image-wrapper">
                                    <Image
                                        src={item.image || getFallbackImage(item.name)}
                                        alt={item.name}
                                        fill
                                        className="item-image"
                                    />
                                </div>

                                <div className="item-details">
                                    <div className="item-header">
                                        <div>
                                            <h3 className="item-name text-white group-hover:text-blue-400 transition-colors">{item.name}</h3>
                                            <p className="item-price text-gray-400">{item.price.toLocaleString()} Birr</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="remove-button hover:bg-red-500/10 hover:text-red-500"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="item-footer">
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="quantity-button hover:text-white"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="quantity-display">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="quantity-button hover:text-white"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <p className="item-total text-white">
                                            {(item.price * item.quantity).toLocaleString()} <span className="text-sm font-normal text-gray-500">Birr</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="summary-wrapper">
                        <div className="summary-card backdrop-blur-md bg-[#121212]/80 border border-white/[0.08]">
                            <h2 className="summary-title">Order Summary</h2>

                            <div className="summary-details">
                                <div className="summary-row">
                                    <span className="summary-label text-gray-400">Subtotal</span>
                                    <span className="summary-value text-white">{subtotal.toLocaleString()} Birr</span>
                                </div>
                                <div className="summary-row highlight bg-emerald-500/10 border border-emerald-500/20">
                                    <span className="summary-label text-emerald-400">
                                        <Tag size={16} />
                                        Delivery
                                    </span>
                                    <span className="summary-value text-emerald-400 font-bold">Free</span>
                                </div>
                            </div>

                            <div className="summary-divider bg-white/10"></div>

                            <div className="summary-total">
                                <span className="total-label text-white">Total</span>
                                <span className="total-value">{total.toLocaleString()} Birr</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="checkout-button w-full group relative overflow-hidden rounded-xl p-[2px]"
                            >
                                <span className="absolute inset-0 bg-[#d4af37] transition-all duration-300" />
                                <div className="relative bg-[#0a0a0a] group-hover:bg-[#1a1a1a] transition-colors duration-300 rounded-[10px] py-5 px-6 flex items-center justify-between">
                                    <span className="font-bold text-white uppercase tracking-wider text-sm" style={{ color: 'white' }}>Proceed to Checkout</span>
                                    <ArrowRight size={20} className="text-[#d4af37] transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>

                            <div className="trust-badges mt-6">
                                <div className="trust-badge">
                                    <Sparkles size={14} />
                                    <span>Secure Checkout</span>
                                </div>
                                <div className="trust-badge">
                                    <ShoppingBag size={14} />
                                    <span>Free Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .cart-page {
                    background-color: var(--background);
                    min-height: 100vh;
                    padding: 8rem 2rem 4rem;
                    color: var(--foreground);
                }

                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .page-header {
                    margin-bottom: 3rem;
                }

                .back-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--foreground);
                    opacity: 0.6;
                    background: transparent;
                    border: none;
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-bottom: 2rem;
                }

                .back-button:hover {
                    opacity: 1;
                    color: var(--foreground);
                }

                .page-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.02em;
                    color: var(--foreground);
                }

                .cart-grid {
                    display: grid;
                    grid-template-columns: 1fr 400px;
                    gap: 3rem;
                    align-items: start;
                }

                .cart-items {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .cart-item {
                    display: flex;
                    gap: 1.5rem;
                    background: var(--dropdown-bg);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--dropdown-border);
                    border-radius: 20px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                }

                .cart-item:hover {
                    border-color: rgba(212, 175, 55, 0.3);
                }

                .item-image-wrapper {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    flex-shrink: 0;
                    border-radius: 16px;
                    overflow: hidden;
                    background: var(--background);
                }

                .item-image-wrapper :global(.item-image) {
                    object-fit: cover;
                }

                .item-image-placeholder {
                    width: 100%;
                    height: 100%;
                    background-color: #1a1a1a;
                    background-image: linear-gradient(45deg, #1a1a1a 25%, #262626 25%, #262626 50%, #1a1a1a 50%, #1a1a1a 75%, #262626 75%, #262626 100%);
                    background-size: 20px 20px;
                }

                .item-details {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .item-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .item-name {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 0.25rem;
                    color: var(--foreground);
                }

                .item-price {
                    font-weight: 500;
                    font-size: 0.9375rem;
                    color: var(--foreground);
                    opacity: 0.7;
                }

                .remove-button {
                    color: var(--foreground);
                    opacity: 0.4;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0.5rem;
                    border-radius: 8px;
                }

                .item-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .quantity-controls {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    background: var(--background);
                    border: 1px solid var(--header-border);
                    border-radius: 10px;
                    padding: 0.25rem;
                }

                .quantity-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 28px;
                    height: 28px;
                    background: transparent;
                    border: none;
                    color: var(--foreground);
                    opacity: 0.5;
                    cursor: pointer;
                    border-radius: 6px;
                    transition: all 0.2s ease;
                }

                .quantity-display {
                    min-width: 32px;
                    text-align: center;
                    color: var(--foreground);
                    font-weight: 600;
                    font-size: 0.875rem;
                }

                .item-total {
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--foreground);
                }

                .summary-wrapper {
                    position: sticky;
                    top: 120px;
                }

                .summary-card {
                    border-radius: 24px;
                    padding: 2rem;
                    background: var(--dropdown-bg);
                    border: 1px solid var(--dropdown-border);
                    backdrop-filter: blur(10px);
                }

                .summary-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--foreground);
                    margin-bottom: 2rem;
                }

                .summary-details {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.9375rem;
                }

                .summary-row.highlight {
                    padding: 0.75rem 1rem;
                    border-radius: 12px;
                }

                .summary-label {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--foreground);
                    opacity: 0.7;
                }

                .summary-divider {
                    height: 1px;
                    margin: 1.5rem 0;
                    background: var(--header-border);
                }

                .summary-total {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .total-label {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: var(--foreground);
                }

                .total-value {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #d4af37;
                }

                .checkout-button {
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .checkout-button:hover {
                    transform: translateY(-1px);
                }

                .trust-badges {
                    display: flex;
                    gap: 0.75rem;
                }

                .trust-badge {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.75rem;
                    background: var(--background);
                    border: 1px solid var(--header-border);
                    border-radius: 12px;
                    color: var(--foreground);
                    opacity: 0.7;
                    font-size: 0.75rem;
                    font-weight: 600;
                }

                @media (max-width: 1024px) {
                    .cart-grid {
                        grid-template-columns: 1fr;
                    }

                    .summary-wrapper {
                        position: relative;
                        top: 0;
                    }
                }

                @media (max-width: 640px) {
                    .cart-page {
                        padding: 6rem 1.5rem 3rem;
                    }

                    .page-title {
                        font-size: 2rem;
                    }

                    .cart-item {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .item-image-wrapper {
                        width: 100%;
                        height: 200px;
                    }

                    .item-footer {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: flex-start;
                    }

                    .trust-badges {
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    );
}
