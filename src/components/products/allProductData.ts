import watercover from '../../assets/watercover.webp'
import elasticfittedsheet from '../../assets/elasticfit.webp'
import pillow1 from '../../assets/pillow1.webp'
import spillow3 from '../../assets/spillow3.webp'
import curve3 from '../../assets/curve3.webp'
import heaven from '../../assets/heaven.webp'
import spinerelax from '../../assets/spinerelax.webp'
import orthobed from '../../assets/orthobed.webp'
import bliss from '../../assets/bliss.webp'
import cocoon from '../../assets/cocoon.webp'

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  alt:  string;
  price: number;
  oldPrice?: number;
  category: 'Mattresses' | 'Pillows' | 'Accessories';
  tags?: string[];
  badges?: string[];
  rating?: number;
  tagline?: string;
  gallery?: string[];
  highlights?: string[];
  specifications?: Record<string, string>;
  sizes?: {
    name: string;
    dimensions: string;
    price: number;
  }[];
  related?: string[];
  href?: string;
  size?: string;
  thickness?: string;
  warranty?: string;
}

export const allProducts: Product[] = [
  // Mattresses
  {
    id: 'hevea-heaven',
    name: 'Hevea Heaven',
    href: '/products/hevea-heaven',
    description: '100% Natural Latex',
    image: heaven,
    alt: '',
    price: 34999,
    oldPrice: 39999,
    category: 'Mattresses',
    tags: ['Natural', 'Latex', 'Breathable'],
    badges: ['Bestseller'],
    rating: 4.8,
  },
  {
    id: 'spinerelax',
    name: 'SpineRelax',
    href: '/products/spine-relax',
    description: 'Dual-Layer Support',
    image: spinerelax,
    alt:'',
    price: 28999,
    category: 'Mattresses',
    tags: ['Orthopedic', 'Memory Foam'],
    rating: 4.6,
  },
  {
    id: 'bliss',
    name: 'Bliss',
    href: '/products/bliss',
    description: '40 Density HR+ 2” Latex',
    image: bliss,
    alt:'',
    price: 24999,
    category: 'Mattresses',
    tags: ['Latex', 'Comfort'],
    badges: ['New'],
    rating: 4.5,
  },
  {
    id: 'cocoon',
    name: 'Cocoon',
    href: '/products/cocoon',
    description: '40 Density HR Foam + 1” Natural Latex',
    image: cocoon,
    alt:'',
    price: 21999,
    oldPrice: 24999,
    category: 'Mattresses',
    tags: ['Foam', 'Latex', 'Support'],
    badges: ['Sale'],
    rating: 4.7,
  },
  {
    id: 'ortho',
    name: 'Ortho',
    href: '/products/ortho',
    description: 'Triple-Layer Comfort',
    image: orthobed,
    alt:'',
    price: 31999,
    category: 'Mattresses',
    tags: ['Orthopedic', 'Support', 'Firm'],
    rating: 4.9,
  },
  // Pillows
  {
    id: 'shredded-latex-pillow',
    name: 'Shredded Latex Pillow',
    price: 1199,
    oldPrice: 1799,
    tagline: 'Adaptive softness for every sleeping style.',
    image: spillow3,
    alt:'',
    description: 'Our Shredded Latex Pillow is filled with fine-milled 100% natural latex, offering adjustable comfort that contours to your head and neck. It provides excellent air circulation, keeping you cool throughout the night. The removable, washable cotton cover ensures a fresh and clean sleep surface.',
    category: 'Pillows',
    tags: ['Natural', 'Latex', 'Adjustable'],
    rating: 4.7,
  },
  {
    id: 'standard-latex-pillow',
    name: 'Standard Latex Pillow',
    price: 1999,
    oldPrice: 2499,
    tagline: 'Classic firmness and bounce for deep sleep.',
    image: pillow1,
    alt:'',
    description: 'The Standard Latex Pillow offers a classic, resilient feel with consistent support. Made from a solid core of natural latex, its pin-core design promotes airflow for a cooler sleep. It’s the perfect choice for those who appreciate a traditional pillow shape with the benefits of latex.',
    category: 'Pillows',
    tags: ['Latex', 'Support', 'Firm'],
    rating: 4.8,
    badges: ['Bestseller'],
  },
  {
    id: 'curves-latex-pillow',
    name: 'Curves Latex Pillow',
    price: 2199,
    oldPrice: 2999,
    tagline: 'Contoured comfort for neck and spine alignment.',
    image: curve3,
    alt:'',
    description: 'Designed to follow the natural curve of your body, the Curves Latex Pillow provides exceptional support for your head, neck, and shoulders. Its ergonomic shape helps align your spine, reducing pressure points and alleviating pain. The dual-height profile suits both back and side sleepers.',
    category: 'Pillows',
    tags: ['Ergonomic', 'Neck Support'],
    rating: 4.9,
  },
  // Accessories
  {
    id: 'waterproof-protector',
    name: 'Waterproof Mattress Protector',
    tagline: 'Protect your comfort with 100% waterproof defense.',
    description: 'Our premium Waterproof Mattress Protector keeps your bed safe from spills, stains, and moisture without compromising comfort. Designed with breathable fabric and a noiseless surface for uninterrupted sleep.',
    image: watercover,
    alt:'',
    category: 'Accessories',
    price: 2499,
    oldPrice: 2999,
    tags: ['Waterproof', 'Breathable'],
    rating: 4.8,
    badges: ['Sale'],
  },
  {
    id: 'elastic-fitted-sheet',
    name: 'Elastic Fitted Sheet',
    tagline: 'Wrinkle-free comfort that stays in place.',
    description: 'Experience wrinkle-free comfort with our Elastic Fitted Sheet, crafted with ultra-soft fabric and a perfect elastic grip. Designed to stay in place all night, ensuring a smooth, cozy sleep experience.',
    image: elasticfittedsheet,
    alt:'',
    category: 'Accessories',
    price: 1999,
    oldPrice: 2499,
    tags: ['Wrinkle-free', 'Soft'],
    rating: 4.7,
  },
];