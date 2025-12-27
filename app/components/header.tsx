'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';

export default function Header() {
    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <Link href="/" className="logo">
                    AK JEWELRY
                </Link>

                {/* Navigation and Actions grouped together */}
                <div className="right-section">
                    {/* Navigation */}
                    <nav className="nav">
                        <Link href="/shop" className="nav-link">Shop</Link>
                        <Link href="/new-arrivals" className="nav-link">New Arrivals</Link>
                        <Link href="/about" className="nav-link">About</Link>
                    </nav>

                    {/* Actions */}
                    <div className="actions">
                        <button className="action-btn" aria-label="Search">
                            <Search size={20} />
                        </button>
                        <button className="action-btn" aria-label="Shopping Cart">
                            <ShoppingCart size={20} />
                        </button>
                        <button className="action-btn" aria-label="User Account">
                            <User size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .header {
                    background-color: #1a1f2e;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    font-family: var(--font-noto-serif-ethiopic), serif;
                }

                .header-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 1rem 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .logo {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: white;
                    text-decoration: none;
                    letter-spacing: 0.05em;
                    transition: opacity 0.2s;
                }

                .logo:hover {
                    opacity: 0.8;
                }

                .right-section {
                    display: flex;
                    align-items: center;
                    gap: 3rem;
                }

                .nav {
                    display: flex;
                    gap: 2.5rem;
                    align-items: center;
                }

                .nav-link {
                    color: rgba(255, 255, 255, 0.9);
                    text-decoration: none;
                    font-size: 0.9375rem;
                    transition: color 0.2s;
                    position: relative;
                }

                .nav-link:hover {
                    color: white;
                }

                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background-color: white;
                    transition: width 0.3s ease;
                }

                .nav-link:hover::after {
                    width: 100%;
                }

                .actions {
                    display: flex;
                    gap: 1.5rem;
                    align-items: center;
                }

                .action-btn {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.2s;
                }

                .action-btn:hover {
                    opacity: 0.7;
                }

                @media (max-width: 768px) {
                    .nav {
                        display: none;
                    }

                    .header-container {
                        padding: 1rem;
                    }
                }
            `}</style>
        </header>
    );
}