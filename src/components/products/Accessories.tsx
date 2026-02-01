import watercover from '../../assets/watercover.png'
import elasticfittedsheet from '../../assets/elasticfit.png'
export interface Accessory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  alt: string;
  sizes: {
    name: string;
    dimensions: string;
    price: number;
  }[];
  related: string[];
}

export const accessories: Accessory[] = [
  {
    id: 'waterproof-protector',
    name: 'Waterproof Mattress Protector',
    tagline: 'Protect your comfort with 100% waterproof defense.',
    description: "Safeguard your valuable mattress investment with the SLEEPONIX 100% Waterproof Mattress Protector. Featuring an advanced, noiseless membrane, this quiet mattress cover provides an impenetrable shield against spills, stains, and bed wetting protection. It's an essential mattress life extender that keeps your sleep environment pristine and hygienic.",
    image: watercover,
    alt: 'Sleeponix Latex Mattress Waterproof Protector',
    sizes: [
      { name: 'King', dimensions: '78” x 72”', price: 2499 },
      { name: 'Queen', dimensions: '78” x 60”', price: 2199 },
      { name: 'Double', dimensions: '78” x 48”', price: 1999 },
      { name: 'Single', dimensions: '78” x 36”', price: 1699 },
    ],
    related: ['elastic-fitted-sheet', 'shredded-latex-pillow'],
  },
  {
    id: 'elastic-fitted-sheet',
    name: 'Elastic Fitted Sheet',
    tagline: 'Wrinkle-free comfort that stays in place.',
    description: "Say goodbye to bunched-up, slipping sheets with the SLEEPONIX Elastic Fitted Sheets. Tailored with a durable, all-around elastic band and deep pocket design, these sheets guarantee a perfect, snug fit on any mattress, especially your thick latex model. Experience the luxury of anti-crease sheets that make easy bed making a reality.",image: elasticfittedsheet,
    alt: 'Sleeponix Elastic Fitted Sheet for mattress protection',
    sizes: [
      { name: 'King', dimensions: '78” x 72”', price: 1999 },
      { name: 'Queen', dimensions: '78” x 60”', price: 1799 },
      { name: 'Double', dimensions: '78” x 48”', price: 1599 },
      { name: 'Single', dimensions: '78” x 36”', price: 1399 },
    ],
    related: ['waterproof-protector', 'standard-latex-pillow'],
  },
];