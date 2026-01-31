'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Sparkles, Gem, Crown, Zap, Layers } from 'lucide-react';
import { useCartStore, useAuthStore } from '@/lib/store';

import { useRouter } from 'next/navigation';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
    const { items } = useCartStore();
    const { user } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const categories = [
        { name: 'All Products', href: '/shop', icon: Layers },
        { name: 'Rings', href: '/rings', icon: Gem },
        { name: 'Necklaces', href: '/necklaces', icon: Crown },
        { name: 'Bracelets', href: '/bracelets', icon: Zap },
        { name: 'Earrings', href: '/earrings', icon: Sparkles },
    ];

    const handleNavigation = (href: string) => {
        setIsShopDropdownOpen(false);
        router.push(href);
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link href="/" className="logo">
                    <span>AK JEWELRY</span>
                </Link>

                {/* Navigation - Desktop */}
                <nav className="nav-desktop">
                    {/* Shop Dropdown */}
                    <div
                        className="nav-dropdown"
                        onMouseEnter={() => setIsShopDropdownOpen(true)}
                        onMouseLeave={() => setIsShopDropdownOpen(false)}
                    >
                        <button className="nav-link dropdown-trigger">
                            Shop
                            <ChevronDown size={16} className={`dropdown-icon ${isShopDropdownOpen ? 'open' : ''}`} />
                        </button>

                        <div className={`dropdown-menu ${isShopDropdownOpen ? 'open' : ''}`}>
                            {categories.map((category) => (
                                <button
                                    key={category.href}
                                    onClick={() => handleNavigation(category.href)}
                                    className="dropdown-item"
                                >
                                    <category.icon size={18} className="dropdown-item-icon" />
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <Link href="/new-arrivals" className="nav-link">New Arrivals</Link>
                    <Link href="/about" className="nav-link">About</Link>
                </nav>

                {/* Actions */}
                <div className="actions">
                    <button className="action-btn desktop-only" aria-label="Search">
                        <Search size={22} />
                    </button>
                    <Link href="/cart" className="action-btn cart-btn" aria-label="Shopping Cart">
                        <div className="cart-icon-wrapper">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </div>
                    </Link>
                    <Link href={user ? "/profile" : "/login"} className="action-btn" aria-label="User Account">
                        <User size={22} />
                    </Link>
                </div>
            </div>

            {/* Mobile Menu - Overlay */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav">
                    <div className="mobile-section">
                        <h3 className="mobile-section-title">Shop</h3>
                        {categories.map((category) => (
                            <Link
                                key={category.href}
                                href={category.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mobile-link"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mobile-divider"></div>

                    <Link href="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link-main">
                        New Arrivals
                    </Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link-main">
                        About Us
                    </Link>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link-main">
                        My Account
                    </Link>
                </nav>
            </div>

            <style jsx>{`
                .header {
                    background-color: transparent;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 1.5rem 0;
                }

                .header.scrolled {
                    background-color: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(20px);
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }

                .header-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: white;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                }

                .logo:hover {
                    color: #d4af37;
                }

                .logo-icon {
                    color: #3b82f6;
                    animation: sparkle 2s ease-in-out infinite;
                }

                @keyframes sparkle {
                    0%, 100% { opacity: 1; transform: rotate(0deg); }
                    50% { opacity: 0.7; transform: rotate(180deg); }
                }

                .nav-desktop {
                    display: flex;
                    gap: 3rem;
                    align-items: center;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .nav-dropdown {
                    position: relative;
                }

                .nav-link {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.875rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #3b82f6;
                    transition: width 0.3s ease;
                }

                .nav-link:hover {
                    color: white;
                }

                .nav-link:hover::after {
                    width: 100%;
                }

                .dropdown-trigger {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                }

                .dropdown-icon {
                    transition: transform 0.3s ease;
                }

                .dropdown-icon.open {
                    transform: rotate(180deg);
                }

                .dropdown-menu {
                    position: absolute;
                    top: calc(100% + 1.5rem);
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(20, 20, 20, 0.98);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 1rem;
                    min-width: 280px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateX(-50%) translateY(-10px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .dropdown-menu.open {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0);
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.25rem;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9375rem;
                    font-weight: 600;
                    border-radius: 14px;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                    position: relative;
                    overflow: hidden;
                    background: transparent;
                    border: 1px solid transparent;
                }

                .dropdown-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background: #d4af37;
                    transform: scaleY(0);
                    transition: transform 0.2s ease;
                }

                .dropdown-item:hover {
                    background: rgba(59, 130, 246, 0.1);
                    border-color: rgba(59, 130, 246, 0.2);
                    color: #3b82f6;
                    transform: translateX(6px);
                }

                .dropdown-item-icon {
                    color: rgba(255, 255, 255, 0.4);
                    transition: color 0.2s ease;
                }

                .dropdown-item:hover .dropdown-item-icon {
                    color: #3b82f6;
                }

                .dropdown-item:hover::before {
                    transform: scaleY(1);
                }

                .actions {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                }

                .action-btn {
                    color: white;
                    transition: all 0.3s ease;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    color: #3b82f6;
                }

                .cart-icon-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .cart-badge {
                    position: absolute;
                    top: -12px;
                    right: -12px;
                    background: #d4af37;
                    color: #000000;
                    font-size: 11px;
                    font-weight: 700;
                    min-width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 5px;
                    border: 2px solid #000000;
                }



                .mobile-toggle {
                    display: none;
                    color: white;
                    z-index: 1001;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                }

                .mobile-menu {
                    position: fixed;
                    inset: 0;
                    background: #0a0a0a;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s ease;
                    z-index: 999;
                }

                .mobile-menu.open {
                    opacity: 1;
                    visibility: visible;
                }

                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                    padding: 2rem;
                    max-width: 400px;
                    width: 100%;
                }

                .mobile-section {
                    width: 100%;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .mobile-section-title {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.875rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 1rem;
                }

                .mobile-link {
                    display: block;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.7);
                    padding: 0.75rem;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .mobile-link:hover {
                    color: #3b82f6;
                    transform: translateX(8px);
                }

                .mobile-link-main {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    transition: all 0.3s ease;
                }

                .mobile-link-main:hover {
                    color: #3b82f6;
                }

                .mobile-divider {
                    width: 100%;
                    height: 1px;
                    background: rgba(255, 255, 255, 0.1);
                    margin: 1rem 0;
                }

                @media (max-width: 1024px) {
                    .nav-desktop {
                        display: none;
                    }

                    .mobile-toggle {
                        display: block;
                    }

                    .desktop-only {
                        display: none;
                    }

                    .header-container {
                        padding: 0 1.5rem;
                    }
                }

                @media (max-width: 640px) {
                    .logo {
                        font-size: 1.25rem;
                    }

                    .mobile-link-main {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </header>
    );
}