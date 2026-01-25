'use client';

import Image from 'next/image';
import { History, Heart, Gem, Globe } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-[#0a0a0a] min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="relative h-[600px] mb-24 rounded-3xl overflow-hidden border border-white/5">
                    <Image
                        src="/images/hero-background.jpg" // Reusing hero image for consistency or similar premium shot
                        alt="AK Jewelry Workshop"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent">
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">OUR STORY</h1>
                        <p className="text-xl text-gray-300 max-w-2xl font-medium leading-relaxed">
                            Where Ethiopian heritage meets modern sophistication. AK Jewelry is more than a brand; it's a celebration of timeless beauty.
                        </p>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-white leading-tight">Crafting Excellence Since 2024</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Inspired by the rich tapestry of Ethiopian culture and the raw majesty of artisanal craftsmanship, AK Jewelry was born from a desire to create pieces that tell a story. Every ring, necklace, and bracelet is a testament to our commitment to quality and elegance.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Our artisans blend traditional techniques with contemporary design, resulting in jewelry that transcends trends and becomes a part of your legacy.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div>
                                <h4 className="text-blue-500 text-3xl font-bold mb-2">100%</h4>
                                <p className="text-gray-300 font-medium">Handcrafted</p>
                            </div>
                            <div>
                                <h4 className="text-blue-500 text-3xl font-bold mb-2">Ethics</h4>
                                <p className="text-gray-300 font-medium">Sourced Gold</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                        <Image
                            src="/images/necklace-category.jpg"
                            alt="Artisan at work"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {[
                        { icon: <History className="text-blue-500" />, title: "Heritage", desc: "Rooted in the ancient artistry of Ethiopia." },
                        { icon: <Gem className="text-blue-500" />, title: "Quality", desc: "Only the finest materials and gemstones." },
                        { icon: <Heart className="text-blue-500" />, title: "Passion", desc: "Every piece is made with love and intent." },
                        { icon: <Globe className="text-blue-500" />, title: "Integrity", desc: "Committed to ethical and sustainable practices." }
                    ].map((val, i) => (
                        <div key={i} className="bg-[#141414] p-10 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                            <div className="mb-6 bg-[#0a0a0a] w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                {val.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{val.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="bg-blue-600 rounded-3xl p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Start Your Legacy Today</h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto relative z-10">
                        Explore our latest collections and find the piece that speaks to your soul.
                    </p>
                    <a href="/shop" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors relative z-10">
                        View Collection
                    </a>
                </div>
            </div>

            <style jsx>{`
                h1, h2, h3 {
                    font-family: var(--font-noto-serif-ethiopic), serif;
                    letter-spacing: -0.01em;
                }
            `}</style>
        </div>
    );
}