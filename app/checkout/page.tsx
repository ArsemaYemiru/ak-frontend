'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore, useAuthStore } from '@/lib/store';
import { ChevronLeft, User, Phone, MapPin, Building, Lock, Wallet, CheckCircle, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
    const { user, jwt } = useAuthStore();
    const router = useRouter();
    const { items, getTotal, clearCart } = useCartStore();

    // Protect route
    useEffect(() => {
        if (!user && typeof window !== 'undefined') {
            router.push('/login?redirect=/checkout');
        }
    }, [user, router]);

    const [formData, setFormData] = useState({
        name: user?.username || '',
        phone: '',
        address: '',
        city: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        setLoading(true);
        setError('');

        try {
            const orderData = {
                data: {
                    items: items,
                    total: getTotal(),
                    deliveryDetails: formData,
                    orderStatus: 'Pending',
                    publishedAt: new Date().toISOString()
                }
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(jwt ? { 'Authorization': `Bearer ${jwt}` } : {})
                },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error?.message || 'Order placement failed');
            }

            clearCart();
            // In a real app, you might redirect to a success page or order history
            router.push('/profile');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (items.length === 0) {
            router.push('/shop');
        }
    }, [items, router]);

    if (items.length === 0) {
        return null;
    }

    const total = getTotal();

    const getFallbackImage = (name: string) => {
        const n = name.toLowerCase();
        if (n.includes('necklace')) return '/images/necklace-category.jpg';
        if (n.includes('earring')) return '/images/earrings-category.jpg';
        if (n.includes('bracelet')) return '/images/bracelet-category.jpg';
        if (n.includes('ring')) return '/images/ring-category.jpg';
        return '/images/ring-category.jpg';
    };

    return (
        <div className="checkout-page relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="page-header">
                    <button onClick={() => router.back()} className="back-button group">
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Cart</span>
                    </button>
                    <h1 className="page-title bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">Secure Checkout</h1>
                </div>

                <div className="checkout-grid">
                    {/* Left Column: Form */}
                    <div className="form-section">
                        <div className="card form-card backdrop-blur-md bg-[#121212]/80 border border-white/[0.08]">
                            <div className="card-header">
                                <h2 className="card-title">Shipping Information</h2>
                                <p className="card-subtitle">Where should we create your masterpiece?</p>
                            </div>

                            <form onSubmit={handleSubmit} className="checkout-form">
                                {error && (
                                    <div className="error-message">
                                        <div className="error-icon">!</div>
                                        {error}
                                    </div>
                                )}

                                <div className="form-group">
                                    <label>Full Name</label>
                                    <div className="input-wrapper focus-within:bg-blue-500/5">
                                        <User size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <div className="input-wrapper focus-within:bg-blue-500/5">
                                            <Phone size={18} className="input-icon" />
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+251 ..."
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>City</label>
                                        <div className="input-wrapper focus-within:bg-blue-500/5">
                                            <Building size={18} className="input-icon" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="Addis Ababa"
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Delivery Address</label>
                                    <div className="input-wrapper focus-within:bg-blue-500/5">
                                        <MapPin size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Street name, house number, landmarks..."
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="payment-method-preview">
                                    <h3 className="payment-title">Payment Method</h3>
                                    <div className="payment-option selected bg-blue-500/10 border-blue-500/30">
                                        <div className="payment-icon bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                                            <Wallet size={24} />
                                        </div>
                                        <div className="payment-details">
                                            <span className="payment-name">Cash on Delivery</span>
                                            <span className="payment-desc">Pay when you receive your order</span>
                                        </div>
                                        <div className="payment-check text-blue-500">
                                            <CheckCircle size={20} />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="submit-button group relative overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:opacity-90" />
                                    <div className="relative flex items-center justify-center gap-2">
                                        {loading ? (
                                            <Loader2 className="animate-spin" size={20} />
                                        ) : (
                                            <>
                                                <Lock size={18} />
                                                <span className="font-bold">Place Order - {total.toLocaleString()} Birr</span>
                                            </>
                                        )}
                                    </div>
                                </button>

                                <p className="security-note">
                                    <Lock size={12} />
                                    Your information is encrypted and secured.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="summary-section">
                        <div className="card summary-card sticky-card backdrop-blur-md bg-[#121212]/80 border border-white/[0.08]">
                            <h2 className="card-title">Order Summary</h2>

                            <div className="order-items">
                                {items.map((item) => (
                                    <div key={item.id} className="order-item">
                                        <div className="item-image-wrapper">
                                            <Image
                                                src={item.image || getFallbackImage(item.name)}
                                                alt={item.name}
                                                fill
                                                className="item-image"
                                            />
                                            <span className="item-qty-badge">{item.quantity}</span>
                                        </div>
                                        <div className="item-info">
                                            <h4 className="item-name">{item.name}</h4>
                                            <p className="item-price">{(item.price * item.quantity).toLocaleString()} Birr</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pricing-breakdown">
                                <div className="price-row">
                                    <span>Subtotal</span>
                                    <span>{total.toLocaleString()} Birr</span>
                                </div>
                                <div className="price-row highlight-green">
                                    <span>Delivery</span>
                                    <span>Free</span>
                                </div>
                                <div className="divider bg-white/10"></div>
                                <div className="price-row total">
                                    <span className="text-white">Total</span>
                                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{total.toLocaleString()} Birr</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .checkout-page {
                    background-color: #050505;
                    min-height: 100vh;
                    padding: 8rem 2rem 4rem;
                    color: white;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .page-header {
                    margin-bottom: 3rem;
                }

                .back-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255, 255, 255, 0.6);
                    background: transparent;
                    border: none;
                    font-size: 0.875rem;
                    cursor: pointer;
                    transition: color 0.3s ease;
                    margin-bottom: 1.5rem;
                }

                .back-button:hover {
                    color: white;
                }

                .page-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin: 0;
                }

                .checkout-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 3rem;
                    align-items: start;
                }

                .card {
                    border-radius: 24px;
                    padding: 2.5rem;
                }

                .card-header {
                    margin-bottom: 2rem;
                }

                .card-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    color: white;
                }

                .card-subtitle {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9375rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .input-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 0.25rem 1rem;
                    transition: all 0.3s ease;
                }

                .input-wrapper:focus-within {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                }

                .input-icon {
                    color: rgba(255, 255, 255, 0.4);
                    flex-shrink: 0;
                }

                input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 1rem;
                    padding: 0.875rem 0;
                }

                input:focus {
                    outline: none;
                    box-shadow: none;
                    background: transparent;
                }
                
                input::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }

                .payment-method-preview {
                    margin: 2rem 0;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .payment-title {
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: rgba(255, 255, 255, 0.6);
                }

                .payment-option {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.25rem;
                    border-radius: 16px;
                }

                .payment-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .payment-details {
                    flex: 1;
                }

                .payment-name {
                    display: block;
                    font-weight: 700;
                    color: white;
                }

                .payment-desc {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.6);
                }

                .submit-button {
                    width: 100%;
                    padding: 1.25rem;
                    border: none;
                    border-radius: 16px;
                    color: white;
                    font-size: 1.125rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
                }

                .submit-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 50px rgba(59, 130, 246, 0.4);
                }

                .submit-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .security-note {
                    margin-top: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.8125rem;
                    color: rgba(255, 255, 255, 0.4);
                }

                .sticky-card {
                    position: sticky;
                    top: 120px;
                }

                .order-items {
                    margin-bottom: 2rem;
                    max-height: 400px;
                    overflow-y: auto;
                    padding-right: 0.5rem;
                }

                .order-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .item-image-wrapper {
                    position: relative;
                    width: 64px;
                    height: 64px;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #0d0d0d;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .item-image {
                    object-fit: cover;
                }

                .item-image-placeholder {
                    width: 100%;
                    height: 100%;
                    background-color: #1a1a1a;
                    background-image: linear-gradient(45deg, #1a1a1a 25%, #262626 25%, #262626 50%, #1a1a1a 50%, #1a1a1a 75%, #262626 75%, #262626 100%);
                    background-size: 20px 20px;
                }

                .item-qty-badge {
                    position: absolute;
                    top: -6px;
                    right: -6px;
                    width: 20px;
                    height: 20px;
                    background: #3b82f6;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 700;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #141414;
                }

                .item-info {
                    flex: 1;
                }

                .item-name {
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 0.25rem;
                }

                .item-price {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .pricing-breakdown {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .price-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.9375rem;
                    color: rgba(255, 255, 255, 0.6);
                }

                .price-row.highlight-green {
                    color: #10b981;
                }

                .price-row.total {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: white;
                }

                .divider {
                    height: 1px;
                    margin: 0.5rem 0;
                }
                
                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    color: #ef4444;
                    padding: 1rem;
                    border-radius: 12px;
                    margin-bottom: 2rem;
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                }

                .error-icon {
                    width: 20px;
                    height: 20px;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 0.75rem;
                    flex-shrink: 0;
                }

                @media (max-width: 900px) {
                    .checkout-grid {
                        grid-template-columns: 1fr;
                    }

                    .summary-section {
                        order: -1;
                    }

                    .sticky-card {
                        position: relative;
                        top: 0;
                    }
                }

                @media (max-width: 640px) {
                    .checkout-page {
                        padding: 6rem 1rem 3rem;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                    }

                    .card {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
