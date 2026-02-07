// Type definitions for AK Jewelry frontend

export interface Category {
    id: string;
    name: string;
    image: string | null;
    link: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string | null;
    link: string;
}

export interface HeroContent {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    backgroundImageLight?: string;
}
