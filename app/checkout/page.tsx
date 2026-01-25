'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore, useAuthStore } from '@/lib/store';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotal, clearCart } = useCartStore();
    const { user, jwt } = useAuthStore();

    const [formData, setFormData] = useState({
        name: user?.username || '',
        phone: '',
        address: '',
        city: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (items.length === 0) return;

        setLoading(true);
        setError('');

        try {
            const orderData = {
                data: {
                    items: items,
                    total: getTotal(),
                    deliveryDetails: formData,
                    user: user?.id,
                    status: 'Pending'
                }
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(jwt ? { 'Authorization': `Bearer ${jwt}` } : {})
                },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error?.message || 'Order placement failed');
            }

            clearCart();
            router.push('/profile'); // Redirect to order history
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        router.push('/shop');
        return null;
    }

    return (
        <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-12 text-center">Checkout</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-[#141414] border border-white/5 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-8">Delivery Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">City</label>
                                <input
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">Delivery Address</label>
                                <textarea
                                    required
                                    rows={3}
                                    className="mt-1 block w-full px-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : `Place Order (Pay on Delivery)`}
                            </button>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="bg-[#141414] border border-white/5 rounded-2xl p-8 h-fit">
                        <h2 className="text-2xl font-bold text-white mb-8">Summary</h2>
                        <div className="space-y-4 mb-8">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between text-gray-400">
                                    <span className="truncate flex-1 pr-4">{item.name} x {item.quantity}</span>
                                    <span className="flex-shrink-0">{(item.price * item.quantity).toLocaleString()} birr</span>
                                </div>
                            ))}
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between text-xl font-bold text-white">
                                <span>Total</span>
                                <span>{getTotal().toLocaleString()} birr</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 text-center italic">
                            Order confirmation will be sent after processing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
