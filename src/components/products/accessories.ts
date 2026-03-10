import waterProof from '../../assets/waterproof.webp';
import elastic from '../../assets/elastic.webp';

export interface Accessory {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  highlights: string[];
  description: string;
  specifications: { [key: string]: string };
  sizes: { name: string; dimensions: string; price: number }[];
  related: string[];
}

export const accessories: Accessory[] = [
  {
    id: 'waterproof-mattress-protector',
    name: 'Waterproof Mattress Protector',
    tagline: 'Protect your comfort with 100% waterproof defense.',
    price: 1299,
    image: waterProof,
    highlights: [
      '100% waterproof barrier',
      'Breathable, noiseless fabric',
      'Hypoallergenic material',
      'Machine washable',
    ],
    description:
      'Keep your mattress fresh and clean with our Waterproof Mattress Protector. It provides a reliable barrier against spills, stains, and allergens without compromising on comfort. The breathable fabric ensures a cool and quiet night\'s sleep.',
    specifications: {
      Material: 'Polyurethane-laminated fabric',
      Fit: 'Fits mattresses up to 15 inches deep',
      Care: 'Machine wash cold, tumble dry low',
      Warranty: '5-Year Limited Warranty',
    },
    sizes: [
      { name: 'Single', dimensions: '72x36"', price: 1299 },
      { name: 'Queen', dimensions: '78x60"', price: 1699 },
      { name: 'King', dimensions: '78x72"', price: 1999 },
    ],
    related: ['elastic-fitted-sheet'],
  },
  {
    id: 'elastic-fitted-sheet',
    name: 'Elastic Fitted Sheet',
    tagline: 'Wrinkle-free comfort that stays in place.',
    price: 899,
    image: elastic,
    highlights: [
      'Ultra-soft, 400-thread-count cotton',
      'All-around elastic for a snug fit',
      'Wrinkle-resistant and easy to care for',
      'Available in multiple colors',
    ],
    description:
      'Experience ultimate comfort with our Elastic Fitted Sheet. Made from premium, long-staple cotton, this sheet is incredibly soft and smooth. The all-around elastic ensures a perfect, snug fit on your mattress, while the wrinkle-resistant finish keeps your bed looking neat and inviting.',
    specifications: {
      Material: '100% Long-Staple Cotton',
      'Thread Count': '400',
      Fit: 'Fits mattresses up to 18 inches deep',
      Care: 'Machine wash warm, tumble dry medium',
    },
    sizes: [
      { name: 'Single', dimensions: '72x36"', price: 899 },
      { name: 'Queen', dimensions: '78x60"', price: 1299 },
      { name: 'King', dimensions: '78x72"', price: 1499 },
    ],
    related: ['waterproof-mattress-protector'],
  },
];