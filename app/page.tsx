import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import NewArrivals from './components/NewArrivals';
import { HeroContent, Category, Product } from './types';

const heroContent: HeroContent = {
  title: 'Where elegance becomes everlasting.',
  subtitle: 'Drawing inspiration from Ethiopian heritage and artistry, AK Jewelry crafts timeless works of art that celebrate your unique beauty and enduring brilliance.',
  ctaText: 'Shop new arrivals',
  ctaLink: '/new-arrivals',
  backgroundImage: '/images/hero-background.jpg',
};

async function getAggregatedData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

  const getStrapiURL = (path: string = '') => {
    return `${apiUrl}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const getImageUrl = (image: any) => {
    if (!image) return '/images/placeholder.jpg';
    if (image.url.startsWith('http')) return image.url;
    return getStrapiURL(image.url);
  };

  const endpoints = [
    { path: 'jeweleries', label: 'Jewelery', placeholder: '/images/hero-background.jpg' },
    { path: 'necklaces', label: 'Necklace', placeholder: '/images/necklace-category.jpg' },
    { path: 'earrings', label: 'Earring', placeholder: '/images/earrings-category.jpg' },
    { path: 'bracelets', label: 'Bracelet', placeholder: '/images/bracelet-category.jpg' }
  ];

  // Calculate 15 days ago
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  const dateString = fifteenDaysAgo.toISOString();

  try {
    const results = await Promise.all(
      endpoints.map(e => fetch(`${apiUrl}/api/${e.path}?filters[createdAt][$gte]=${dateString}&populate=*`, { cache: 'no-store' }))
    );
    const allData = await Promise.all(results.map(r => r.json()));

    let products: any[] = [];
    let categories: any[] = [];

    allData.forEach((data, index) => {
      // Create category entry even if no data for display consistency
      const firstImage = data.data?.[0]?.images?.[0];
      categories.push({
        id: index.toString(),
        name: endpoints[index].label,
        image: firstImage ? getImageUrl(firstImage) : endpoints[index].placeholder,
        link: `/shop?category=${endpoints[index].label}`
      });

      if (data.data) {
        const pros = data.data.filter((p: any) => p.featured).map((p: any) => {
          const prodImage = p.images?.[0];
          return {
            id: p.id.toString(),
            name: p.name,
            price: p.price,
            image: prodImage ? getImageUrl(prodImage) : endpoints[index].placeholder,
            link: `/product/${p.slug || p.id}?type=${endpoints[index].path}`,
          };
        });
        products = [...products, ...pros];
      }
    });

    // Deduplicate products by ID
    const uniqueProducts = Array.from(new Map(products.map(item => [item.id, item])).values());

    return { products: uniqueProducts, categories };
  } catch (error) {
    console.error('Error fetching aggregated data:', error);
    return { products: [], categories: [] };
  }
}

export default async function Home() {
  const { products, categories } = await getAggregatedData();

  return (
    <main>
      <HeroSection content={heroContent} />
      {categories.length > 0 && <CategoryGrid categories={categories} />}
      {products.length > 0 && <NewArrivals products={products} />}
    </main>
  );
}
