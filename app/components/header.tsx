'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore, useAuthStore } from '@/lib/store';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { items } = useCartStore();
    const { user } = useAuthStore();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link href="/" className="logo">
                    AK JEWELRY
                </Link>

                {/* Navigation - Desktop */}
                <nav className="nav-desktop">
                    <Link href="/shop" className="nav-link">Shop</Link>
                    <Link href="/shop?filter=new" className="nav-link">New Arrivals</Link>
                    <Link href="/about" className="nav-link">About</Link>
                </nav>

                {/* Actions */}
                <div className="actions">
                    <button className="action-btn desktop-only" aria-label="Search">
                        <Search size={22} />
                    </button>
                    <Link href="/cart" className="action-btn cart-link" aria-label="Shopping Cart">
                        <ShoppingCart size={22} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                    <Link href={user ? "/profile" : "/login"} className="action-btn" aria-label="User Account">
                        <User size={22} />
                    </Link>
                </div>
            </div>

            {/* Mobile Menu - Overlay */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav">
                    <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                    <Link href="/shop?filter=new" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
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
                    background-color: rgba(10, 10, 10, 0.8);
                    backdrop-filter: blur(20px);
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: white;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                }

                .nav-desktop {
                    display: flex;
                    gap: 3rem;
                    align-items: center;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .nav-link {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.875rem;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                }

                .nav-link:hover {
                    color: white;
                }

                .actions {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                }

                .action-btn {
                    color: white;
                    transition: transform 0.3s ease, opacity 0.3s ease;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    opacity: 0.8;
                }

                .cart-badge {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background-color: #3b82f6;
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    min-width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #0a0a0a;
                }

                .mobile-toggle {
                    display: none;
                    color: white;
                    z-index: 1001;
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
                    gap: 2.5rem;
                }

                .mobile-nav :global(a) {
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
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
            `}</style>
        </header>
    );
}