'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Package, LogOut, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
    const { user, jwt, logout } = useAuthStore();
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/orders?filters[user][id]=${user.id}&populate=*`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });
                const data = await res.json();
                if (data.data) {
                    setOrders(data.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, jwt, router]);

    if (!user) return null;

    return (
        <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-white">My Account</h1>
                        <p className="text-gray-400 mt-2">Welcome back, {user.username}</p>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            router.push('/');
                        }}
                        className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>

                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Package className="w-6 h-6 text-blue-500" /> Order History
                    </h2>

                    {loading ? (
                        <div className="text-gray-500">Loading orders...</div>
                    ) : orders.length === 0 ? (
                        <div className="bg-[#141414] border border-white/5 rounded-2xl p-12 text-center text-gray-400">
                            You haven't placed any orders yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-[#141414] border border-white/5 rounded-2xl p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-xs text-blue-500 font-mono">ORDER #{order.id}</span>
                                            <h3 className="text-lg font-bold text-white mt-1">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </h3>
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-semibold border border-blue-500/20">
                                            {order.status}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {order.items?.map((item: any, idx: number) => (
                                            <div key={idx} className="text-gray-400 text-sm flex justify-between">
                                                <span>{item.name} x {item.quantity}</span>
                                                <span>{(item.price * item.quantity).toLocaleString()} birr</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="h-px bg-white/5 my-4" />

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Total Charged</span>
                                        <span className="text-white font-bold">{order.total?.toLocaleString()} birr</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
