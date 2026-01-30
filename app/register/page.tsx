'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles, ChevronRight } from 'lucide-react';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const { setAuth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error?.message || 'Registration failed');
            }

            setAuth(data.user, data.jwt);
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background" />
                <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>Join Our Community</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="title-line">Begin Your</span>
                        <span className="title-line delay-1">Journey</span>
                    </h1>
                    <p className="hero-subtitle">
                        Create an account to unlock exclusive collections and personalized experiences
                    </p>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link>
                        <ChevronRight size={16} />
                        <span>Register</span>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="form-section">
                <div className="form-container">
                    <div className="form-card">
                        <form onSubmit={handleRegister} className="form-content">
                            {error && (
                                <div className="error-message">
                                    <span className="error-dot" />
                                    {error}
                                </div>
                            )}

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <label className="input-label">Username</label>
                                    <div className="input-container">
                                        <div className="input-icon">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            className="input-field"
                                            placeholder="yourname"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="input-wrapper">
                                    <label className="input-label">Email Address</label>
                                    <div className="input-container">
                                        <div className="input-icon">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            className="input-field"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="input-wrapper">
                                    <label className="input-label">Password</label>
                                    <div className="input-container">
                                        <div className="input-icon">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            className="input-field"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="submit-button"
                            >
                                <span className="button-gradient" />
                                <div className="button-content">
                                    <span className="button-text">
                                        {loading ? 'Creating Account...' : 'Create Account'}
                                    </span>
                                    {loading ? (
                                        <Loader2 className="button-loader" size={18} />
                                    ) : (
                                        <ArrowRight className="button-arrow" size={18} />
                                    )}
                                </div>
                            </button>

                            <div className="form-footer">
                                <p className="footer-text">
                                    Already have an account?{' '}
                                    <Link href="/login" className="footer-link">
                                        Sign in
                                        <ArrowRight size={14} className="link-arrow" />
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .auth-page {
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
                    background: radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
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
                    background: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    border-radius: 50px;
                    color: #3b82f6;
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

                /* Form Section */
                .form-section {
                    padding: 4rem 2rem 8rem;
                    position: relative;
                    background: #000000;
                }

                .form-container {
                    max-width: 500px;
                    margin: 0 auto;
                }

                .form-card {
                    background: #0a0a0a;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    border-radius: 24px;
                    padding: 3rem;
                }

                .form-content {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #ef4444;
                    padding: 1rem 1.25rem;
                    border-radius: 12px;
                    font-size: 0.875rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .error-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #ef4444;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .input-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .input-label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #d4af37;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-left: 0.25rem;
                }

                .input-container {
                    position: relative;
                    width: 100%;
                }

                .input-icon {
                    position: absolute;
                    top: 50%;
                    left: 1.125rem;
                    transform: translateY(-50%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                    color: rgba(255, 255, 255, 0.3);
                    transition: color 0.3s ease;
                }

                .input-container:focus-within .input-icon {
                    color: #d4af37;
                }

                .input-field {
                    display: block;
                    width: 100%;
                    padding: 1rem 1.25rem 1rem 3.25rem;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: white;
                    font-size: 0.9375rem;
                    line-height: 1.5;
                    transition: all 0.3s ease;
                    box-sizing: border-box;
                }

                .input-field::placeholder {
                    color: rgba(255, 255, 255, 0.3);
                }

                .input-field:focus {
                    outline: none;
                    border-color: #d4af37;
                    background: rgba(255, 255, 255, 0.05);
                }

                .submit-button {
                    width: 100%;
                    position: relative;
                    border-radius: 12px;
                    border: 2px solid #3b82f6;
                    background: #3b82f6;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }

                .submit-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .submit-button:hover:not(:disabled) {
                    background: #2563eb;
                    border-color: #2563eb;
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
                }

                .button-gradient {
                    display: none;
                }

                .button-content {
                    position: relative;
                    background: transparent;
                    border-radius: 10px;
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .button-text {
                    font-weight: 600;
                    color: #ffffff;
                    font-size: 0.9375rem;
                }

                .button-loader {
                    animation: spin 1s linear infinite;
                    color: #ffffff;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .button-arrow {
                    color: #ffffff;
                    transition: all 0.3s ease;
                }

                .submit-button:hover:not(:disabled) .button-arrow {
                    transform: translateX(4px);
                }

                .form-footer {
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: center;
                }

                .footer-text {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.6);
                }

                .footer-link {
                    color: #d4af37;
                    font-weight: 600;
                    transition: color 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .footer-link:hover {
                    color: #3b82f6;
                }

                .link-arrow {
                    transition: transform 0.3s ease;
                }

                .footer-link:hover .link-arrow {
                    transform: translateX(2px);
                }

                /* Responsive */
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

                    .form-card {
                        padding: 2rem;
                    }

                    .form-section {
                        padding: 3rem 1.5rem 5rem;
                    }
                }
            `}</style>
        </div>
    );
}
