'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { ShoppingBag, ChevronLeft } from 'lucide-react';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCartStore();

    useEffect(() => {
        const fetchProduct = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
            try {
                // Try fetching as numeric ID or documentId first
                let res = await fetch(`${apiUrl}/api/jewelries/${id}?populate=*`);
                let data = await res.json();

                // If not found or error, try filtering by slug field
                if (!res.ok || !data.data) {
                    const slugRes = await fetch(`${apiUrl}/api/jewelries?filters[slug][$eq]=${id}&populate=*`);
                    const slugData = await slugRes.json();
                    if (slugData.data && slugData.data.length > 0) {
                        data = { data: slugData.data[0] };
                    } else {
                        setLoading(false);
                        return;
                    }
                }

                if (data.data) {
                    const p = data.data;
                    setProduct({
                        id: p.id.toString(),
                        name: p.name || 'Exquisite Jewelry',
                        price: p.price || 0,
                        description: p.description,
                        material: p.material,
                        image: p.images?.[0]?.url ? `${apiUrl}${p.images[0].url}` : '',
                    });
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Loading details...</div>;
    if (!product) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Product not found.</div>;

    return (
        <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 mr-1" /> Back to Shop
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#141414] border border-white/5">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
                        <p className="text-2xl text-blue-500 font-semibold mb-6">{product.price.toLocaleString()} birr</p>

                        <div className="space-y-6 mb-8 text-gray-300">
                            <p className="leading-relaxed">{product.description || 'Elevate your style with this exquisite piece, handcrafted to perfection.'}</p>

                            {product.material && (
                                <div>
                                    <h3 className="text-white text-sm uppercase tracking-wider font-semibold mb-2">Material</h3>
                                    <p>{product.material}</p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => {
                                addItem({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.image,
                                    quantity: 1
                                });
                                router.push('/cart');
                            }}
                            className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02]"
                        >
                            <ShoppingBag className="w-5 h-5" /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
