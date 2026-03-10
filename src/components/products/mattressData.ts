import heveaHeaven from '../../assets/heaven.webp';
import spineRelax from '../../assets/spinerelax.webp';
import bliss from '../../assets/bliss.webp';
import cocoon from '../../assets/cocoon.webp';
import ortho from '../../assets/ortho.webp';

export const mattressData = [
  {
    id: 'hevea-heaven',
    name: 'Hevea Heaven',
    href: '/products/hevea-heaven',
    description: '100% Natural Latex for a heavenly sleep.',
    price: 25000,
    features: [
      'Naturally temperature-regulating',
      'Adaptive support for all sleep positions',
      'Hypoallergenic and anti-microbial',
    ],
    image: heveaHeaven,
  },
  {
    id: 'spinerelax',
    name: 'SpineRelax',
    href: '/products/spine-relax',
    description: 'Dual-Layer Support for optimal spine alignment.',
    price: 22000,
    features: [
      'Latex + foam combo for pressure relief',
      'Excellent motion isolation',
      'Medium-firm balanced support',
    ],
    image: spineRelax,
  },
  {
    id: 'bliss',
    name: 'Bliss',
    href: '/products/bliss',
    description: '40 Density HR+ 2” Latex for blissful comfort.',
    price: 18000,
    features: [
        'Breathable comfort layer',
        'Medium-firm balanced feel',
        'Affordable natural latex option',
    ],
    image: bliss,
  },
  {
    id: 'cocoon',
    name: 'Cocoon',
    href: '/products/cocoon',
    description: '40 Density HR Foam + 1” Natural Latex for a cozy feel.',
    price: 32000,
    features: [
        'Ultra-soft top layer',
        'Best for side sleepers',
        'Comes with organic cover',
    ],
    image: cocoon,
  },
  {
    id: 'ortho',
    name: 'Ortho',
    href: '/products/ortho',
    description: 'Triple-Layer Comfort for orthopedic support.',
    price: 28000,
    features: [
        'Natural latex top layer',
        'High-density support foam',
        'Orthopedic excellence for joint relief',
    ],
    image: ortho,
  },
];