'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! WE will get back to you soon.');
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <div className="hero-section">
                <Image
                    src="/images/hero-background.jpg"
                    alt="Jewelry Background"
                    fill
                    className="hero-image"
                />
                <div className="hero-overlay">
                    <h1 className="hero-title">Contact Us</h1>
                    <p className="hero-subtitle">
                        Drawing inspiration from Ethiopia's rich culture and artistry, our jewelry is carefully handcrafted to embody elegance, significance, and enduring beauty that lasts beyond a lifetime.
                    </p>
                    <Link
                        href="/new-arrivals"
                        className="hero-cta"
                    >
                        Shop New Arrivals
                    </Link>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-container">
                <div className="form-card">
                    <h2 className="form-title">
                        We Want To Hear <br /> From You
                    </h2>

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter Your Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                placeholder="Enter Your Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                type="text"
                                placeholder="Enter Your Company name"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Tell us more</label>
                            <textarea
                                placeholder="Share detail about your needs"
                                rows={1}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Info & Map Section */}
            <div className="info-section">
                <div className="info-column">
                    <h2 className="info-title">Contact Information</h2>
                    <div className="info-list">
                        <div className="info-item">
                            <div className="info-icon">
                                <Phone size={32} />
                            </div>
                            <span className="info-text">+251 92 729 8999</span>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <Mail size={32} />
                            </div>
                            <span className="info-text">Danielwxermypls@icloud.com</span>
                        </div>
                        <div className="info-item">
                            <div className="info-icon">
                                <MapPin size={32} />
                            </div>
                            <span className="info-text address-text">
                                Africa Avenue / Bole Road <br />
                                Kirkos <br />
                                Ethiopia
                            </span>
                        </div>
                    </div>
                </div>

                <div className="map-column">
                    <h2 className="info-title">Location</h2>
                    <div className="map-card">
                        <Image
                            src="/images/map-placeholder.jpg"
                            alt="Store Location Map"
                            fill
                            className="map-image"
                        />
                        <div className="map-overlay">
                            <p className="map-location">Daniel Xe's Location</p>
                            <p className="map-sub">Near Dembel City Center</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .contact-page {
                    background-color: var(--background);
                    min-height: 100vh;
                    padding-bottom: 6rem;
                }

                /* Hero */
                .hero-section {
                    position: relative;
                    height: 600px;
                    margin: 1rem 3rem 6rem;
                    border-radius: 1.5rem;
                    overflow: hidden;
                    border: 1px solid var(--header-border);
                }

                .hero-image {
                    object-fit: cover;
                    opacity: 0.6;
                }

                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 1.5rem;
                    background: linear-gradient(to top, var(--background), transparent 80%);
                }

                .hero-title {
                    font-size: 5rem;
                    font-weight: 900;
                    color: var(--foreground);
                    margin-bottom: 1.5rem;
                    line-height: 1;
                    letter-spacing: -0.02em;
                }

                .hero-subtitle {
                    font-size: 1.25rem;
                    color: var(--foreground);
                    opacity: 0.8;
                    max-width: 42rem;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                    font-weight: 500;
                }

                .hero-cta {
                    background: #3b82f6;
                    color: white;
                    font-weight: 700;
                    padding: 0.75rem 2rem;
                    border-radius: 0.75rem;
                    transition: all 0.3s ease;
                }

                .hero-cta:hover {
                    background: #2563eb;
                    transform: translateY(-2px);
                }

                /* Form */
                .form-container {
                    max-width: 56rem;
                    margin: 0 auto 8rem;
                    padding: 0 1rem;
                }

                .form-card {
                    background: var(--dropdown-bg);
                    border: 1px solid var(--header-border);
                    border-radius: 2.5rem;
                    padding: 4rem;
                }

                .form-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--foreground);
                    text-align: center;
                    margin-bottom: 4rem;
                    line-height: 1.2;
                }

                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                }

                .form-group label {
                    display: block;
                    font-size: 1.125rem;
                    font-weight: 500;
                    color: var(--foreground);
                    opacity: 0.8;
                    margin-bottom: 0.5rem;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid var(--header-border);
                    padding: 0.75rem 0;
                    color: var(--foreground);
                    font-size: 1rem;
                    outline: none;
                    transition: border-color 0.3s ease;
                    resize: none;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    border-bottom-color: #3b82f6;
                }

                .submit-button {
                    background: #3b82f6;
                    color: white;
                    font-weight: 700;
                    padding: 1rem 3rem;
                    border-radius: 0.75rem;
                    font-size: 1.125rem;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                    align-self: flex-start;
                    width: 100%;
                }

                .submit-button:hover {
                    background: #2563eb;
                    transform: translateY(-2px);
                }

                /* Info Section */
                .info-section {
                    max-width: 80rem;
                    margin: 0 auto;
                    padding: 0 2rem;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6rem;
                    align-items: start;
                }

                .info-title {
                    font-size: 2.25rem;
                    font-weight: 700;
                    color: var(--foreground);
                    margin-bottom: 4rem;
                }

                .info-list {
                    display: flex;
                    flex-direction: column;
                    gap: 3rem;
                }

                .info-item {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .info-icon {
                    background: var(--dropdown-bg);
                    padding: 1rem;
                    border-radius: 1rem;
                    border: 1px solid var(--header-border);
                    color: #3b82f6;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .info-text {
                    font-size: 1.5rem;
                    font-weight: 500;
                    color: var(--foreground);
                }

                .address-text {
                    line-height: 1.6;
                }

                /* Map */
                .map-card {
                    position: relative;
                    aspect-ratio: 16/9;
                    border-radius: 2rem;
                    overflow: hidden;
                    border: 1px solid var(--header-border);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                }

                .map-image {
                    object-fit: cover;
                    transition: transform 1s ease;
                }

                .map-card:hover .map-image {
                    transform: scale(1.05);
                }

                .map-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 2rem;
                    background: linear-gradient(to top, var(--background), transparent);
                }

                .map-location {
                    color: var(--foreground);
                    font-weight: 700;
                    font-size: 1.125rem;
                }

                .map-sub {
                    color: var(--foreground);
                    opacity: 0.7;
                    font-size: 0.875rem;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .info-section {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                }

                @media (max-width: 768px) {
                    .hero-section {
                        margin: 1rem;
                        height: 400px;
                    }
                    .hero-title {
                        font-size: 3rem;
                    }
                    .form-card {
                        padding: 2rem;
                    }
                    .info-text {
                        font-size: 1.125rem;
                    }
                }
            `}</style>
        </div>
    );
}
