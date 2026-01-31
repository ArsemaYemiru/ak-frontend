'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Package, LogOut, Calendar, ChevronRight, ShoppingBag, Sparkles, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfilePage() {
    const { user, jwt, logout } = useAuthStore();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        if (!user) {
            router.push('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/orders?populate=*&sort=createdAt:desc`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                const data = await res.json();
                if (data.data) {
                    setOrders(data.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, jwt, router]);

    if (!user) return null;

    const getStatusColor = (status: string) => {
        if (!status) return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'confirmed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'shipped': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="profile-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background" />
                <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>Member Dashboard</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="title-line">My</span>
                        <span className="title-line delay-1">Profile</span>
                    </h1>
                    <p className="hero-subtitle">
                        Welcome back, <span className="username-highlight">{user.username}</span>
                    </p>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <ChevronRight size={16} />
                        <span>Profile</span>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="content-section">
                <div className="container">
                    <div className="grid-layout">
                        {/* Sidebar / Stats */}
                        <div className="sidebar">
                            <div className="profile-card">
                                <div className="profile-avatar">
                                    <div className="avatar-circle">
                                        <UserIcon size={28} />
                                    </div>
                                </div>
                                <div className="profile-info">
                                    <h3 className="profile-name">{user.username}</h3>
                                    <p className="profile-email">{user.email}</p>
                                </div>
                                <div className="divider" />
                                <div className="stats-grid">
                                    <div className="stat-item">
                                        <span className="stat-label">Total Orders</span>
                                        <span className="stat-value">{orders.length}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Member Since</span>
                                        <span className="stat-value">{new Date(user.createdAt).getFullYear()}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Status</span>
                                        <span className="stat-value status-active">
                                            <div className="status-dot" />
                                            Active
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        logout();
                                        router.push('/');
                                    }}
                                    className="logout-button"
                                >
                                    <LogOut size={18} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="main-content">
                            <div className="section-header">
                                <div className="header-icon">
                                    <Package size={20} />
                                </div>
                                <h2 className="section-title">Order History</h2>
                            </div>

                            {loading ? (
                                <div className="loading-state">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="skeleton-card" />
                                    ))}
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">
                                        <ShoppingBag size={48} />
                                    </div>
                                    <h3 className="empty-title">No orders yet</h3>
                                    <p className="empty-description">
                                        Looks like you haven&apos;t placed any orders yet. Start exploring our collection to find something special.
                                    </p>
                                    <Link href="/shop" className="shop-button">
                                        Start Shopping
                                        <ChevronRight size={18} />
                                    </Link>
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {orders.map((order) => (
                                        <div key={order.id} className="order-card">
                                            <div className="order-header">
                                                <div className="order-meta">
                                                    <div className="order-id-row">
                                                        <span className="order-id">#{order.id.toString().padStart(6, '0')}</span>
                                                        <span className={`order-status ${getStatusColor(order.orderStatus)}`}>
                                                            {order.orderStatus}
                                                        </span>
                                                    </div>
                                                    <div className="order-date">
                                                        <Calendar size={14} />
                                                        {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </div>
                                                </div>
                                                <div className="order-total">
                                                    <div className="total-amount">
                                                        {order.total?.toLocaleString()} <span className="currency">birr</span>
                                                    </div>
                                                    <div className="total-label">Total Amount</div>
                                                </div>
                                            </div>

                                            <div className="order-items">
                                                {order.items?.map((item: any, idx: number) => (
                                                    <div key={idx} className="order-item">
                                                        <div className="item-info">
                                                            <div className="item-image">
                                                                {item.image ? (
                                                                    <Image src={item.image} alt={item.name} fill className="image" />
                                                                ) : (
                                                                    <span className="image-placeholder">Img</span>
                                                                )}
                                                            </div>
                                                            <span className="item-details">
                                                                <span className="item-name">{item.name}</span>
                                                                <span className="item-quantity">x{item.quantity}</span>
                                                            </span>
                                                        </div>
                                                        <span className="item-price">{(item.price * item.quantity).toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .profile-page {
                    background-color: #000000;
                    min-height: 100vh;
                }

                /* Hero Section */
                .hero-section {
                    position: relative;
                    height: 50vh;
                    min-height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: #000000;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                }

                .hero-background {
                    position: absolute;
                    inset: 0;
                    background: #000000;
                }

                .hero-background::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
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
                }

                .hero-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 4rem;
                    font-weight: 900;
                    color: #ffffff;
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
                    color: #d4af37;
                }

                @keyframes slideUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .hero-subtitle {
                    font-size: 1.125rem;
                    color: rgba(255, 255, 255, 0.7);
                    max-width: 600px;
                    margin: 0 auto 2rem;
                    line-height: 1.8;
                }

                .username-highlight {
                    color: #d4af37;
                    font-weight: 600;
                }

                .breadcrumb {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 50px;
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.6);
                }

                .breadcrumb :global(a) {
                    color: #3b82f6;
                    transition: color 0.3s ease;
                }

                .breadcrumb :global(a:hover) {
                    color: #d4af37;
                }

                /* Content Section */
                .content-section {
                    padding: 4rem 2rem 8rem;
                    position: relative;
                    background: #000000;
                }

                .container {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .grid-layout {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 3rem;
                }

                /* Sidebar */
                .sidebar {
                    position: sticky;
                    top: 120px;
                    height: fit-content;
                }

                .profile-card {
                    background: #0a0a0a;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 24px;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .profile-avatar {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 0.5rem;
                }

                .avatar-circle {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: #3b82f6;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                }

                .profile-info {
                    text-align: center;
                }

                .profile-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 0.25rem;
                }

                .profile-email {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .divider {
                    height: 1px;
                    background: rgba(255, 255, 255, 0.1);
                }

                .stats-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .stat-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .stat-value {
                    font-size: 0.9375rem;
                    font-weight: 600;
                    color: #ffffff;
                }

                .status-active {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #d4af37;
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #d4af37;
                }

                .logout-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.875rem 1.5rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9375rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .logout-button:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.2);
                    color: #ffffff;
                }

                /* Main Content */
                .main-content {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .header-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background: rgba(212, 175, 55, 0.1);
                    color: #d4af37;
                }

                .section-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 1.75rem;
                    font-weight: 800;
                    color: #ffffff;
                }

                .loading-state {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .skeleton-card {
                    height: 200px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    animation: skeleton-pulse 1.5s ease-in-out infinite;
                }

                @keyframes skeleton-pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 5rem 2rem;
                    text-align: center;
                    background: #0a0a0a;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 24px;
                }

                .empty-icon {
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    color: rgba(255, 255, 255, 0.3);
                    margin-bottom: 2rem;
                }

                .empty-title {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 0.75rem;
                }

                .empty-description {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 1rem;
                    max-width: 500px;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .shop-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 1rem 2rem;
                    background: #3b82f6;
                    color: #ffffff;
                    border-radius: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-size: 0.875rem;
                    transition: all 0.3s ease;
                    border: 2px solid #3b82f6;
                }

                .shop-button:hover {
                    background: #2563eb;
                    border-color: #2563eb;
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
                }

                .orders-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .order-card {
                    background: #0a0a0a;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 24px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                }

                .order-card:hover {
                    border-color: rgba(212, 175, 55, 0.4);
                }

                .order-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .order-meta {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .order-id-row {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .order-id {
                    color: #3b82f6;
                    font-family: monospace;
                    font-size: 0.875rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                }

                .order-status {
                    padding: 0.25rem 0.75rem;
                    border-radius: 50px;
                    font-size: 0.625rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    border: 1px solid;
                }

                .order-date {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.875rem;
                }

                .order-total {
                    text-align: right;
                }

                .total-amount {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #d4af37;
                }

                .currency {
                    font-size: 0.875rem;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 0.5);
                }

                .total-label {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.5);
                    margin-top: 0.25rem;
                }

                .order-items {
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 16px;
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .order-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .item-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .item-image {
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    overflow: hidden;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .image {
                    object-fit: cover;
                }

                .image-placeholder {
                    font-size: 0.625rem;
                    color: rgba(255, 255, 255, 0.3);
                }

                .item-details {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.875rem;
                }

                .item-name {
                    color: #ffffff;
                    font-weight: 500;
                }

                .item-quantity {
                    color: rgba(255, 255, 255, 0.4);
                }

                .item-price {
                    font-family: monospace;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.875rem;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .grid-layout {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .sidebar {
                        position: static;
                    }
                }

                @media (max-width: 768px) {
                    .hero-section {
                        height: 40vh;
                        min-height: 300px;
                    }

                    .hero-title {
                        font-size: 2.5rem;
                    }

                    .hero-subtitle {
                        font-size: 1rem;
                    }

                    .content-section {
                        padding: 3rem 1.5rem 5rem;
                    }

                    .order-header {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .order-total {
                        text-align: left;
                    }
                }
            `}</style>
        </div>
    );
}
