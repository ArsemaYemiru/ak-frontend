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
        <div className="bg-[#0a0a0a] min-h-screen pb-24">
            {/* Hero Section */}
            <div className="relative h-[600px] mb-24 rounded-3xl overflow-hidden mx-4 sm:mx-8 lg:mx-12 mt-4 border border-white/5">
                <Image
                    src="/images/hero-background.jpg" // High-end jewelry background
                    alt="Jewelry Background"
                    fill
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent">
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">Contact Us</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-medium leading-relaxed mb-8">
                        Drawing inspiration from Ethiopia's rich culture and artistry, our jewelry is carefully handcrafted to embody elegance, significance, and enduring beauty that lasts beyond a lifetime.
                    </p>
                    <Link
                        href="/new-arrivals"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all"
                    >
                        Shop New Arrivals
                    </Link>
                </div>
            </div>

            {/* Form Section */}
            <div className="max-w-4xl mx-auto px-4 mb-32">
                <div className="bg-[#141414] border border-white/10 rounded-[40px] p-12 lg:p-16">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">
                        We Want To Hear <br /> From You
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="space-y-8">
                            <div>
                                <label className="block text-lg font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Full Name"
                                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-300 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter Your Phone Number"
                                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-300 mb-2">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Company name"
                                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-medium text-gray-300 mb-2">Tell us more</label>
                                <textarea
                                    placeholder="Share detail about your needs"
                                    rows={1}
                                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl transition-all text-lg"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Info & Map Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <div>
                    <h2 className="text-4xl font-bold text-white mb-16">Contact Information</h2>
                    <div className="space-y-12">
                        <div className="flex items-center gap-6">
                            <div className="bg-[#141414] p-4 rounded-2xl border border-white/5">
                                <Phone className="text-blue-500" size={32} />
                            </div>
                            <span className="text-2xl font-medium text-gray-200">+251 92 729 8999</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="bg-[#141414] p-4 rounded-2xl border border-white/5">
                                <Mail className="text-blue-500" size={32} />
                            </div>
                            <span className="text-2xl font-medium text-gray-200">Danielwxermypls@icloud.com</span>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 mt-1">
                                <MapPin className="text-blue-500" size={32} />
                            </div>
                            <span className="text-2xl font-medium text-gray-200 leading-relaxed">
                                Africa Avenue / Bole Road <br />
                                Kirkos <br />
                                Ethiopia
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-4xl font-bold text-white mb-16">Location</h2>
                    <div className="relative aspect-video rounded-[32px] overflow-hidden border border-white/10 group shadow-2xl">
                        {/* Mock Map Image - In a real app this would be a Google Map or leaflet component */}
                        <Image
                            src="/images/map-placeholder.jpg"
                            alt="Store Location Map"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-[#0a0a0a]/20" />
                        <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-white font-bold text-lg">Daniel Xe's Location</p>
                            <p className="text-gray-300 text-sm">Near Dembel City Center</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .max-w-7xl {
                        grid-template-columns: 1fr;
                        gap: 3rem;
                    }
                }

                @media (max-width: 768px) {
                    h1 {
                        font-size: 3rem !important;
                    }
                    
                    h2 {
                        font-size: 2rem !important;
                        margin-bottom: 2rem !important;
                    }
                    
                    .relative.h-\\[600px\\] {
                        height: 400px !important;
                    }
                    
                    .bg-\\[\\#141414\\].border {
                        padding: 2rem !important;
                    }
                    
                    .text-2xl {
                        font-size: 1.25rem !important;
                    }
                    
                    .space-y-12 {
                        gap: 2rem !important;
                    }
                }

                @media (max-width: 640px) {
                    h1 {
                        font-size: 2.5rem !important;
                    }
                    
                    .relative.h-\\[600px\\] {
                        height: 300px !important;
                        margin-left: 1rem !important;
                        margin-right: 1rem !important;
                    }
                    
                    .bg-\\[\\#141414\\].border {
                        padding: 1.5rem !important;
                        border-radius: 1.5rem !important;
                    }
                    
                    .flex.items-center.gap-6,
                    .flex.items-start.gap-6 {
                        flex-direction: column;
                        align-items: flex-start !important;
                        gap: 1rem !important;
                    }
                    
                    .text-2xl {
                        font-size: 1.125rem !important;
                    }
                    
                    button {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
