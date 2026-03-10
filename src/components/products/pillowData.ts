import spillow from '../../assets/spillow3.webp';
import pillow1 from '../../assets/pillow1.webp'
import curve3 from '../../assets/curve3.webp'
export interface Pillow {
  id: string;
  name: string;
  size: string;
  price: number;
  tagline: string;
  image: string;
  highlights: string[];
  description: string;
  specifications: Record<string, string>;
}

export const pillows: Pillow[] = [
  {
    id: 'shredded-latex-pillow',
    name: 'Shredded Latex Pillow',
    size: '16” x 24”',
    price: 1199,
    tagline: 'Adaptive softness for every sleeping style.',
    image: spillow,
    
    highlights: [
        'Natural Latex Foam',
        'Breathable & Hypoallergenic',
        'Removable Cotton Cover',
        'Orthopedic Support'
    ],
    description: 'Discover truly personalized comfort with the SLEEPONIX Shredded Latex Pillow. Filled with pure, resilient shredded natural latex, this customizable latex pillow allows you to easily add or remove fill to achieve your exact desired loft and adjustable firmness. Get the perfect head and neck alignment, whether you are a side, back, or stomach sleeper.' ,
    specifications: {
        'Fill Material': '100% Shredded Natural Latex',
        'Cover': 'Organic Cotton, Removable & Washable',
        'Firmness': 'Medium-Soft, Adjustable',
        'Warranty': '3-Year Limited Warranty'
    }
  },
  {
    id: 'standard-latex-pillow',
    name: 'Standard Latex Pillow',
    size: '17” x 27”',
    price: 1999,
    tagline: 'Classic firmness and bounce for deep sleep.',
    image: pillow1,
    
    highlights: [
        'Solid Natural Latex Core',
        'Consistent Support',
        'Pin-Core Ventilation',
        'Durable & Long-Lasting'
    ],
    description: 'Experience the reliable, uniform support of the SLEEPONIX Standard Latex Pillow. Crafted from a single, moulded block of natural latex, this pillow offers consistent, contouring neck support that gently cradles your head. Its resilient bounce provides exceptional pressure relief without flattening over time.',
    specifications: {
        'Fill Material': 'Solid Core 100% Natural Latex',
        'Cover': 'Premium Knitted Fabric',
        'Firmness': 'Medium-Firm',
        'Warranty': '5-Year Limited Warranty'
    }
  },
  {
    id: 'curves-latex-pillow',
    name: 'Curves Latex Pillow',
    size: '14” x 24”',
    price: 2199,
    tagline: 'Contoured comfort for neck and spine alignment.',
    image: curve3,
    
    highlights: [
        'Ergonomic Contour Shape',
        'Alleviates Neck Pain',
        'Dual-Height Design',
        'Pressure-Relieving'
    ],
    description: 'Target your neck health with the SLEEPONIX CURVE Latex Pillow, the best cervical support pillow for pain relief. Its ergonomic latex pillow design features a gentle wave shape that perfectly aligns your head and neck with your spine, making it the Best Pillow for Neck Pain and stiffness.',
    specifications: {
        'Fill Material': 'Contoured 100% Natural Latex',
        'Cover': 'Soft Bamboo Fabric',
        'Firmness': 'Firm, Ergonomic',
        'Warranty': '5-Year Limited Warranty'
    }
  },
];