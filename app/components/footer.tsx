"use client"
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="brand-section">
                    <h2 className="brand-title">AK JEWELRY</h2>
                    <p className="brand-tagline">Jewelry designed for the modern era</p>
                </div>

                {/* Shop Section */}
                <div className="footer-column">
                    <h3 className="column-title">Shop</h3>
                    <ul className="footer-links">
                        <li><Link href="/new-arrivals">New Arrivals</Link></li>
                        <li><Link href="/best-sellers">Best Sellers</Link></li>
                        <li><Link href="/necklace">Necklace</Link></li>
                        <li><Link href="/rings">Rings</Link></li>
                        <li><Link href="/earrings">Earrings</Link></li>
                        <li><Link href="/bracelets">Bracelets</Link></li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="footer-column">
                    <h3 className="column-title">Support</h3>
                    <ul className="footer-links">
                        <li><Link href="/new-arrivals">New Arrivals</Link></li>
                        <li><Link href="/best-sellers">Best Sellers</Link></li>
                        <li><Link href="/necklace">Necklace</Link></li>
                        <li><Link href="/rings">Rings</Link></li>
                    </ul>
                </div>

                {/* Company Section */}
                <div className="footer-column">
                    <h3 className="column-title">Company</h3>
                    <ul className="footer-links">
                        <li><Link href="/about">About Us</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/terms">TermsAndConditions</Link></li>
                    </ul>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    background-color: #1a1f2e;
                    border-top: 3px solid #3b82f6;
                    padding: 4rem 2rem 2rem;
                    font-family: var(--font-noto-serif-ethiopic), serif;
                }

                .footer-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1fr;
                    gap: 4rem;
                }

                .brand-section {
                    padding-right: 2rem;
                }

                .brand-title {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: white;
                    margin: 0 0 0.75rem 0;
                    letter-spacing: 0.05em;
                }

                .brand-tagline {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.875rem;
                    margin: 0;
                    line-height: 1.5;
                }

                .footer-column {
                    display: flex;
                    flex-direction: column;
                }

                .column-title {
                    font-size: 1rem;
                    font-weight: 600;
                    color: white;
                    margin: 0 0 1.5rem 0;
                }

                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .footer-links li a {
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    font-size: 0.875rem;
                    transition: color 0.2s;
                }

                .footer-links li a:hover {
                    color: white;
                }

                @media (max-width: 1024px) {
                    .footer-container {
                        grid-template-columns: 1fr 1fr;
                        gap: 3rem;
                    }
                }

                @media (max-width: 640px) {
                    .footer-container {
                        grid-template-columns: 1fr;
                        gap: 2.5rem;
                    }

                    .footer {
                        padding: 3rem 1rem 1.5rem;
                    }
                }
            `}</style>
        </footer>
    );
}