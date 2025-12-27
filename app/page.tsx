import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import NewArrivals from './components/NewArrivals';
import { HeroContent, Category, Product } from './types';

// Mock data - Replace with API calls to your backend
const heroContent: HeroContent = {
  title: 'Where elegance becomes everlasting.',
  subtitle: 'Drawing inspiration from Ethiopian heritage and artistry, AK Jewelry crafts timeless works of art that celebrate your unique beauty and enduring brilliance.',
  ctaText: 'Shop new arrivals',
  ctaLink: '/new-arrivals',
  backgroundImage: '/images/hero-background.jpg', // Replace with actual image path
};

const categories: Category[] = [
  {
    id: '1',
    name: 'RINGS',
    image: '/images/ring-category.jpg', // Replace with actual image path
    link: '/category/rings',
  },
  {
    id: '2',
    name: 'NECKLACE',
    image: '/images/necklace-category.jpg', // Replace with actual image path
    link: '/category/necklace',
  },
  {
    id: '3',
    name: 'BRACELETS',
    image: '/images/bracelet-category.jpg', // Replace with actual image path
    link: '/category/bracelets',
  },
  {
    id: '4',
    name: 'EARRINGS',
    image: '/images/earrings-category.jpg', // Replace with actual image path
    link: '/category/earrings',
  },
];

const newArrivals: Product[] = [
  {
    id: '1',
    name: 'Emerald Gold Chain',
    price: 24999,
    image: '/images/product-1.jpg', // Replace with actual image path
    link: '/product/emerald-gold-chain',
  },
  {
    id: '2',
    name: 'Emerald Gold Chain',
    price: 24999,
    image: '/images/product-2.jpg', // Replace with actual image path
    link: '/product/emerald-gold-chain-2',
  },
  {
    id: '3',
    name: 'Emerald Gold Chain',
    price: 24999,
    image: '/images/product-3.jpg', // Replace with actual image path
    link: '/product/emerald-gold-chain-3',
  },
  {
    id: '4',
    name: 'Emerald Gold Chain',
    price: 24999,
    image: '/images/product-4.jpg', // Replace with actual image path
    link: '/product/emerald-gold-chain-4',
  },
];

// Example of how to fetch from backend (uncomment when ready):
// async function getCategories() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=*`, {
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch categories');
//   return res.json();
// }

// async function getNewArrivals() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?filters[isNewArrival]=true&populate=*`, {
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch new arrivals');
//   return res.json();
// }

export default function Home() {
  // When ready to integrate with backend, uncomment:
  // const categoriesData = await getCategories();
  // const newArrivalsData = await getNewArrivals();

  return (
    <main>
      <HeroSection content={heroContent} />
      <CategoryGrid categories={categories} />
      <NewArrivals products={newArrivals} />
    </main>
  );
}

