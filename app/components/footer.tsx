"use client"
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="brand-section">
                    <h2 className="brand-title">AK JEWELRY</h2>
                    <p className="brand-tagline">
                        Crafting timeless elegance and enduring brilliance. Drawing inspiration from Ethiopia's rich heritage to celebrate your unique beauty.
                    </p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-column">
                    <h3 className="column-title">Explore</h3>
                    <ul className="footer-links">
                        <li><Link href="/shop">All Collection</Link></li>
                        <li><Link href="/rings">Rings</Link></li>
                        <li><Link href="/necklaces">Necklaces</Link></li>
                        <li><Link href="/bracelets">Bracelets</Link></li>
                        <li><Link href="/earrings">Earrings</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div className="footer-column">
                    <h3 className="column-title">Support</h3>
                    <ul className="footer-links">
                        <li><Link href="/about">Our Story</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/shipping">Shipping Policy</Link></li>
                        <li><Link href="/terms">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-column">
                    <h3 className="column-title">Contact Us</h3>
                    <ul className="contact-info">
                        <li><MapPin size={18} style={{ color: '#d4af37' }} /> <span>Addis Ababa, Ethiopia</span></li>
                        <li><Phone size={18} style={{ color: '#d4af37' }} /> <span>+251 911 000 000</span></li>
                        <li><Mail size={18} style={{ color: '#d4af37' }} /> <span>info@akjewelry.com</span></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} AK JEWELRY. All rights reserved.</p>
            </div>

            <style jsx>{`
                .footer {
                    background-color: var(--dropdown-bg);
                    color: var(--foreground);
                    padding: 6rem 2rem 2rem;
                    border-top: 1px solid var(--header-border);
                }

                .footer-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1.5fr;
                    gap: 4rem;
                }

                .brand-title {
                    font-size: 1.75rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    margin-bottom: 1.5rem;
                    color: var(--foreground);
                }

                .brand-tagline {
                    color: var(--foreground);
                    opacity: 0.6;
                    font-size: 0.9375rem;
                    line-height: 1.8;
                    margin-bottom: 2rem;
                    max-width: 320px;
                }

                .social-links {
                    display: flex;
                    gap: 1.25rem;
                }

                .social-links a {
                    color: var(--foreground);
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }

                .social-links a:hover {
                    color: #d4af37;
                    opacity: 1;
                    transform: translateY(-3px);
                }

                .column-title {
                    font-size: 1rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 2rem;
                    color: var(--foreground);
                }

                .footer-links, .contact-info {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .footer-links :global(a) {
                    color: var(--foreground);
                    opacity: 0.5;
                    font-size: 0.9375rem;
                    transition: all 0.3s ease;
                }

                .footer-links :global(a:hover) {
                    color: var(--foreground);
                    opacity: 1;
                    padding-left: 4px;
                }

                .contact-info li {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    color: var(--foreground);
                    opacity: 0.5;
                    font-size: 0.9375rem;
                }

                .footer-bottom {
                    max-width: 1400px;
                    margin: 4rem auto 0;
                    padding-top: 2rem;
                    border-top: 1px solid var(--header-border);
                    text-align: center;
                    color: var(--foreground);
                    opacity: 0.3;
                    font-size: 0.8125rem;
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
                        gap: 3rem;
                    }

                    .footer {
                        padding: 4rem 1.5rem 2rem;
                    }
                }
            `}</style>
        </footer>
    );
}