'use client';

import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center pt-24 px-4 text-center">
                <div className="bg-[#141414] p-12 rounded-3xl border border-white/5 space-y-6">
                    <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto" />
                    <h1 className="text-3xl font-bold text-white">Your cart is empty</h1>
                    <p className="text-gray-400 max-w-xs mx-auto">Discover our collection and find something beautiful to fill it with.</p>
                    <Link
                        href="/shop"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all"
                    >
                        Go to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-12">Your Shopping Bag</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="bg-[#141414] border border-white/5 rounded-2xl p-4 flex gap-6 items-center">
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-white truncate">{item.name}</h3>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-blue-500 font-semibold mt-1">{item.price.toLocaleString()} birr</p>

                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center border border-white/10 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 text-gray-400 hover:text-white"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center text-white font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 text-gray-400 hover:text-white"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{getTotal().toLocaleString()} birr</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Delivery</span>
                                    <span className="text-green-500">Free</span>
                                </div>
                                <div className="h-px bg-white/10" />
                                <div className="flex justify-between text-xl font-bold text-white">
                                    <span>Total</span>
                                    <span>{getTotal().toLocaleString()} birr</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all"
                            >
                                Checkout <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
