import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'auralis',
    name: 'Auralis',
    subtitle: 'Extrait de Parfum',
    tagline: 'Scents That Stay • 18+ Hours Longevity',
    description: 'A scent that captures elegance, leaves an impression, and stays with you beyond the moment. Formulated with high-concentration essential essences ensuring 18+ hours of radiant projection.',
    price: 3650,
    originalPrice: 4200,
    volume: '50 ML',
    availableVolumes: ['5 ML', '10 ML', '30 ML', '50 ML', '100 ML'],
    category: 'perfume',
    image: '/images/auralis-hero-user.jpg',
    galleryImages: [
      '/images/auralis-hero-user.jpg',
      '/images/auralis-lifestyle.jpg',
      '/images/perfume-mist-spray.jpg'
    ],
    notes: {
      top: ['Italian Bergamot', 'Pink Peppercorn', 'Crisp White Tea'],
      heart: ['French Orange Blossom', 'Iris Pallida', 'Cashmeran'],
      base: ['Golden Ambergris', 'Madagascar Vanilla', 'Royal Sandalwood'],
      family: 'Woody & Oriental',
      longevity: '18+ Hours (Ultra High)',
      projection: 'Strong & Alluring',
      mood: 'Confident, Refined, Unforgettable'
    },
    rating: 4.9,
    reviewsCount: 142,
    isBestseller: false,
    isNew: false,
    stock: 24,
    inStock: true
  },
  {
    id: 'veloura',
    name: 'Veloura',
    subtitle: 'Eau de Parfum',
    tagline: 'Velvety. Sensual. Addictive.',
    description: 'A rich and smooth fragrance that captivates the senses and lingers beautifully. Made for those who embrace their supreme elegance with velvety warmth and dark floral mystery.',
    price: 3850,
    originalPrice: 4500,
    volume: '100 ML',
    availableVolumes: ['50 ML', '100 ML'],
    category: 'perfume',
    image: 'images/img.png',
    galleryImages: [
      '/images/veloura-card.jpg',
      '/images/veloura-100ml.jpg',
      '/images/veloura-car.jpg',
      '/images/signature-trio.jpg'
    ],
    notes: {
      top: ['Black Plum', 'Velvet Saffron', 'Violet Leaves'],
      heart: ['Turkish Damascena Rose', 'Smoked Suede', 'Labdanum'],
      base: ['Rich Bourbon Amber', 'Aged Patchouli', 'Dark Agarwood'],
      family: 'Warm Amber & Gourmand',
      longevity: '16+ Hours',
      projection: 'Intimate to Moderate',
      mood: 'Sensual, Enigmatic, Sophisticated'
    },
    rating: 4.9,
    reviewsCount: 98,
    isBestseller: false,
    isNew: false,
    stock: 18,
    inStock: true
  },
  {
    id: 'elaria',
    name: 'Elaria',
    subtitle: 'Eau de Parfum',
    tagline: 'Graceful. Feminine. Timeless.',
    description: 'A soft floral fragrance that leaves an exquisite trail of poise. Made for the modern persona who carries quiet grace wherever they go, sparkling with dewy petals and luminous citrus.',
    price: 3650,
    originalPrice: 4200,
    volume: '50 ML',
    availableVolumes: ['5 ML', '50 ML', '100 ML'],
    category: 'perfume',
    image: '/images/elaria-card.jpg',
    galleryImages: [
      '/images/elaria-card.jpg',
      '/images/elaria-50ml.jpg',
      '/images/elaria-100ml.jpg',
      '/images/discovery-elaria-5ml.jpg'
    ],
    notes: {
      top: ['Sicilian Green Lime', 'Sparkling Mandarin', 'Bergamot Zest'],
      heart: ['Grasse Jasmine', 'Dewy White Peony', 'Magnolia Petals'],
      base: ['Clean White Musk', 'Blonde Cedar', 'Soft Cashmere'],
      family: 'Floral & Sensual',
      longevity: '14+ Hours',
      projection: 'Softly Radiant',
      mood: 'Graceful, Radiant, Pure'
    },
    rating: 4.8,
    reviewsCount: 115,
    isBestseller: false,
    isNew: false,
    stock: 32,
    inStock: true
  },
  {
    id: 'obsidian-mind',
    name: 'Obsidian Mind',
    subtitle: 'Extrait de Parfum',
    tagline: 'Bold. Mysterious. Magnetic.',
    description: 'An intense fragrance for those who think deep, feel deeply, and leave a lasting impact. A smoky fusion of incense, dark cedar, and mineral obsidian accords.',
    price: 3850,
    originalPrice: 4600,
    volume: '100 ML',
    availableVolumes: ['5 ML', '50 ML', '100 ML'],
    category: 'extrait',
    image: 'images/chase2.jpeg',
    galleryImages: [
      '/images/obsidian-mind-card.jpg',
      '/images/obsidian-mind-100ml.jpg',
      '/images/discovery-obsidian-5ml.jpg',
      '/images/extrait-collection.jpg'
    ],
    notes: {
      top: ['Smoked Incense', 'Calabrian Bergamot', 'Black Cardamom'],
      heart: ['Birch Wood', 'Dark Mineral Accord', 'Smoky Vetiver'],
      base: ['Black Leather', 'Roasted Tonka Bean', 'Haitian Amber'],
      family: 'Woody & Oriental',
      longevity: '20+ Hours',
      projection: 'Commanding',
      mood: 'Bold, Intellectual, Powerful'
    },
    rating: 5.0,
    reviewsCount: 84,
    isBestseller: false,
    isNew: true,
    stock: 14,
    inStock: true
  },
  {
    id: 'rosalind',
    name: 'Rosalind',
    subtitle: 'Eau de Parfum',
    tagline: 'Sun-Kissed. Oceanic. Captivating.',
    description: 'Sunlight glistening across warm sands and pristine pearl shells. A romantic maritime rose warmed by morning solar breeze and delicate amber pearls.',
    price: 3650,
    originalPrice: 4200,
    volume: '50 ML',
    availableVolumes: ['5 ML', '50 ML'],
    category: 'perfume',
    image: '/images/rosalind-50ml.jpg',
    galleryImages: [
      '/images/rosalind-50ml.jpg',
      '/images/discovery-rosalind-5ml.jpg',
      '/images/signature-trio.jpg'
    ],
    notes: {
      top: ['Morning Sea Spray', 'Sunlit Bergamot', 'Pink Peppercorn'],
      heart: ['Coastal Wild Rose', 'Crushed Pearl Accord', 'White Neroli'],
      base: ['Golden Ambergris', 'Warm Shoreline Driftwood', 'Musk'],
      family: 'Fresh Citrus & Aquatic',
      longevity: '14+ Hours',
      projection: 'Breezy & Lingering',
      mood: 'Romantic, Coastal, Ethereal'
    },
    rating: 4.8,
    reviewsCount: 76,
    isBestseller: false,
    isNew: false,
    stock: 20,
    inStock: true
  },
  {
    id: 'lunavelle',
    name: 'Lunavelle',
    subtitle: 'Eau de Parfum',
    tagline: 'Smells Like Vacation.',
    description: 'An escape to the sun-soaked Mediterranean coastline. French lavender sprigs drifting over warm golden sands and refreshing coastal twilight breezes.',
    price: 3650,
    originalPrice: 4200,
    volume: '50 ML',
    availableVolumes: ['50 ML'],
    category: 'perfume',
    image: 'images/pic2.png',
    collectionImage: '/images/lunavelle-billiards.jpg',
    galleryImages: [
      '/images/lunavelle-50ml.jpg',
      '/images/lunavelle-billiards.jpg',
      '/images/lunavelle-yacht.jpg',
      '/images/signature-trio.jpg'
    ],
    notes: {
      top: ['French Lavender', 'Meyer Lemon', 'Ripe Anjou Pear'],
      heart: ['Mediterranean Neroli', 'Sunlit Coconut Water', 'Heliotrope'],
      base: ['Warm Solar Sand', 'Tonka Bean', 'Golden Amber'],
      family: 'Aromatic & Herbal',
      longevity: '16+ Hours',
      projection: 'Invigorating',
      mood: 'Carefree, Sun-drenched, Luxurious'
    },
    rating: 4.9,
    reviewsCount: 63,
    isBestseller: false,
    isNew: false,
    stock: 22,
    inStock: true
  },
  {
    id: 'gold-veil',
    name: 'Gold Veil',
    subtitle: 'Eau de Parfum',
    tagline: 'Radiant. Warm. Unforgettable.',
    description: 'A luxurious blend that wraps you in golden allure and sophistication. Soft yet intense, delicate yet powerful — an enveloping halo of sheer luxury.',
    price: 5950,
    originalPrice: 6800,
    volume: '100 ML',
    availableVolumes: ['100 ML'],
    category: 'perfume',
    image: 'public/images/pic.png',
    galleryImages: [
      '/images/gold-veil-card.jpg',
      '/images/gold-veil-100ml.jpg',
      '/images/auralis-collection.jpg'
    ],
    notes: {
      top: ['Golden Saffron', 'Sunlit Orange Blossom', 'Warm Honey'],
      heart: ['Moroccan Rose', 'Ylang-Ylang', 'Cashmere Accord'],
      base: ['Golden Amber Resin', 'Blonde Agarwood', 'Creamy Sandalwood'],
      family: 'Warm Amber & Gourmand',
      longevity: '18+ Hours',
      projection: 'Majestic & Luminous',
      mood: 'Royal, Warm, Opulent'
    },
    rating: 4.9,
    reviewsCount: 52,
    isBestseller: false,
    isNew: true,
    stock: 12,
    inStock: true
  },
  {
    id: 'phantom-desire',
    name: 'Phantom Desire',
    subtitle: 'Extrait de Parfum',
    tagline: 'Enigmatic. Sensual. Decadent.',
    description: 'Formulated with ultra-rich natural absolutes. An intoxicating blend of sweet dark cherry, bitter almond, and rare smoked oud resins.',
    price: 4200,
    originalPrice: 4900,
    volume: '50 ML',
    availableVolumes: ['50 ML'],
    category: 'extrait',
    image: '/images/extrait-collection.jpg',
    galleryImages: [
      '/images/extrait-collection.jpg',
      '/images/perfume-mist-spray.jpg'
    ],
    notes: {
      top: ['Dark Cherry Nectar', 'Bitter Almond', 'Spiced Rum'],
      heart: ['Tobacco Blossom', 'Midnight Jasmine', 'Peruvian Balsam'],
      base: ['Smoked Agarwood', 'Benzoin Tears', 'Roasted Tonka'],
      family: 'Warm Amber & Gourmand',
      longevity: '22+ Hours',
      projection: 'Hypnotic',
      mood: 'Seductive, Mysterious, Intoxicating'
    },
    rating: 5.0,
    reviewsCount: 47,
    isBestseller: false,
    isNew: true,
    stock: 9,
    inStock: true
  },
  {
    id: 'ain-al-qurat',
    name: 'Ain Al Qurat',
    subtitle: 'Pure Concentrated Perfume Oil',
    tagline: 'Alcohol-Free Artisanal Attar',
    description: 'Pure concentrated perfume oil formulated without alcohol. Hand-blended using traditional slow aging in glass flacons for timeless depth.',
    price: 2200,
    originalPrice: 2600,
    volume: '15 ML',
    availableVolumes: ['15 ML'],
    category: 'attar',
    image: '/images/ain-al-qurat-15ml.jpg',
    galleryImages: [
      '/images/ain-al-qurat-15ml.jpg'
    ],
    notes: {
      top: ['Taif Rose Attar', 'Crisp White Musk'],
      heart: ['Dehn Al Oud Hindi', 'Warm Floral Amber'],
      base: ['Mysore Sandalwood Oil', 'Velvet Cashmeran'],
      family: 'Woody & Oriental',
      longevity: '24+ Hours',
      projection: 'Close & Intimate',
      mood: 'Sacred, Grounding, Pure'
    },
    rating: 4.9,
    reviewsCount: 39,
    isBestseller: false,
    isNew: false,
    stock: 15,
    inStock: true
  },
  {
    id: 'candle-daisy-bloom',
    name: 'Daisy Bloom Floral Candles',
    subtitle: 'Handcrafted Sculpted Florals',
    tagline: 'Delicate. Scented. Handcrafted.',
    description: 'Hand-poured sculpted botanical daisy candles in blush pink and ivory petals. Scented with wild chamomile, blooming jasmine, and sweet nectar. Perfect as floating candles or delicate table accents.',
    price: 1200,
    originalPrice: 1500,
    volume: 'Set of 6',
    availableVolumes: ['Set of 6', 'Set of 12'],
    category: 'candle',
    image: '/images/candle-daisy-blooms.jpg',
    galleryImages: [
      '/images/candle-daisy-blooms.jpg',
      '/images/candle-lifestyle-warm.jpg'
    ],
    notes: {
      top: ['Wild Chamomile', 'Meyer Lemon', 'Sweet Dew'],
      heart: ['Blushing Daisy Petals', 'Grasse Jasmine', 'Neroli'],
      base: ['Natural Soy-Coconut Wax', 'Soft Musk', 'Warm Honey'],
      family: 'Floral & Sensual',
      longevity: '30+ Hours Total Burn',
      projection: 'Gentle Room Ambiance',
      mood: 'Serene, Playful, Romantic'
    },
    rating: 4.9,
    reviewsCount: 42,
    isBestseller: false,
    isNew: true,
    stock: 30,
    inStock: true
  },
  {
    id: 'candle-luna-bloom',
    name: 'Luna Bloom Big Candle',
    subtitle: 'Handcrafted Ceramic Vessel',
    tagline: 'Every Flame Holds a Fragrance',
    description: 'Sculpted embossed ceramic candle adorned with botanical reliefs. Hand-poured with natural soy-coconut wax blend and pure perfume oils.',
    price: 1800,
    originalPrice: 2200,
    volume: '380g',
    availableVolumes: ['380g'],
    category: 'candle',
    image: '/images/candle-luna-bloom-card.jpg',
    galleryImages: [
      '/images/candle-luna-bloom-card.jpg',
      '/images/candle-luna-bloom.jpg',
      '/images/candle-lifestyle-warm.jpg'
    ],
    notes: {
      top: ['Fresh White Linen', 'Bergamot Bloom'],
      heart: ['White Jasmine', 'Baby Breath Petals'],
      base: ['Soft Cedar', 'Warm Vanilla Musk'],
      family: 'Floral & Sensual',
      longevity: '55+ Hours Burn Time',
      projection: 'Gentle Room Filling',
      mood: 'Serene, Elegant, Soothing'
    },
    rating: 4.9,
    reviewsCount: 88,
    isBestseller: false,
    isNew: false,
    stock: 25,
    inStock: true
  },
  {
    id: 'candle-iced-coffee',
    name: 'Viral Iced Coffee Candle',
    subtitle: 'Artisanal Whipped Soy Candle',
    tagline: 'Handcrafted With Care',
    description: 'The viral sensory candle created with layers of hand-poured iced latte wax, whipped cream topping, and roasted coffee bean notes.',
    price: 1800,
    originalPrice: 2200,
    volume: '350g',
    availableVolumes: ['350g'],
    category: 'candle',
    image: '/images/candle-iced-coffee-card.jpg',
    galleryImages: [
      '/images/candle-iced-coffee-card.jpg',
      '/images/candle-iced-coffee.jpg'
    ],
    notes: {
      top: ['Fresh Espresso', 'Toasted Hazelnut'],
      heart: ['Whipped Vanilla Cream', 'Caramel Drizzle'],
      base: ['Warm Sugar Cane', 'Mocha Butter'],
      family: 'Warm Amber & Gourmand',
      longevity: '48+ Hours Burn Time',
      projection: 'Delicious & Cozy',
      mood: 'Comforting, Playful, Indulgent'
    },
    rating: 5.0,
    reviewsCount: 112,
    isBestseller: false,
    isNew: false,
    stock: 19,
    inStock: true
  },
  {
    id: 'candle-black-tin',
    name: 'Black Tin Candle',
    subtitle: 'Matte Minimalist Travel Candle',
    tagline: 'Made to Elevate Every Moment',
    description: 'Sleek matte black tin candle with fitted snug lid. Hand-poured with double lead-free cotton wick for an even, clean burn wherever you travel.',
    price: 700,
    originalPrice: 900,
    volume: '160g',
    availableVolumes: ['160g'],
    category: 'candle',
    image: '/images/candle-black-tin.jpg',
    collectionImage: '/images/candle-black-tin-card.jpg',
    galleryImages: [
      '/images/candle-black-tin.jpg',
      '/images/candle-black-tin-card.jpg'
    ],
    notes: {
      top: ['Dark Cardamom', 'Sweet Orange'],
      heart: ['Smoked Sandalwood', 'Black Tea'],
      base: ['Amber Resin', 'Clove Bud'],
      family: 'Woody & Oriental',
      longevity: '32+ Hours Burn Time',
      projection: 'Warm & Cozy',
      mood: 'Intimate, Modern, Sleek'
    },
    rating: 4.8,
    reviewsCount: 64,
    isBestseller: false,
    isNew: false,
    stock: 40,
    inStock: true,
    collectionsOnly: true
  },
  {
    id: 'botanical-resin-coasters',
    name: 'Botanical Floral Resin Coasters',
    subtitle: 'Handcrafted Preserved Floral Coasters',
    tagline: 'Preserved Florals • Hand-Poured Resin',
    description: 'Handcrafted crystal resin coasters infused with genuine pressed botanical daisies and jewel-toned floral petals. Hand-poured with heat-resistant, glossy finish — perfect as elegant candle plates or artisanal table accents.',
    price: 950,
    originalPrice: 1200,
    volume: 'Set of 2',
    availableVolumes: ['Set of 2', 'Set of 4', 'Set of 6'],
    category: 'candle',
    image: '/images/resin-floral-coasters.jpg',
    galleryImages: [
      '/images/resin-floral-coasters.jpg',
      '/images/resin-coasters-collection.jpg'
    ],
    notes: {
      top: ['Pressed Wild Daisies', 'Crystal Clear Resin'],
      heart: ['Hand-Poured Jewel Pigments', 'Gold Leaf Accents'],
      base: ['Smooth Polished Rim', 'Heat-Resistant Finish'],
      family: 'Floral & Sensual',
      longevity: 'Lifetime Keepsake',
      projection: 'Vibrant Visual Accent',
      mood: 'Artisanal, Colorful, Whimsical'
    },
    rating: 4.9,
    reviewsCount: 56,
    isBestseller: false,
    isNew: true,
    stock: 28,
    inStock: true
  },
  {
    id: 'candle-colorful-glow',
    name: 'Colorful Glass Candle',
    subtitle: 'Hand-Poured Artisan Glass Vessel',
    tagline: 'Vibrant Flame • Soothing Ambiance',
    description: 'Handcrafted with colorful natural soy wax and pure botanical perfume oils in clear glass. Infuses your space with cozy warmth and gentle room-filling radiance.',
    price: 1400,
    originalPrice: 1700,
    volume: '220g',
    availableVolumes: ['220g'],
    category: 'candle',
    image: '/images/candle-colorful-glass.jpg',
    galleryImages: [
      '/images/candle-colorful-glass.jpg',
      '/images/colorful.jpeg'
    ],
    notes: {
      top: ['Sweet Vanilla Bean', 'Crisp White Linen'],
      heart: ['Blooming Peony', 'Wild Lavender'],
      base: ['Amber Caramel', 'Warm Sandalwood'],
      family: 'Floral & Sensual',
      longevity: '35+ Hours Burn Time',
      projection: 'Gentle Room Ambiance',
      mood: 'Serene, Cozy, Vibrant'
    },
    rating: 4.9,
    reviewsCount: 38,
    isBestseller: false,
    isNew: true,
    stock: 25,
    inStock: true,
    collectionsOnly: true
  }
];

export const FRAGRANCE_FAMILIES = [
  'All Collections',
  'Extrait de Parfum',
  'Signature Perfumes',
  'Woody & Oriental',
  'Floral & Sensual',
  'Warm Amber & Gourmand',
  'Artisanal Candles'
] as const;

// Volume pricing multiplier map
export const VOLUME_PRICE_MAP: Record<string, Record<string, number>> = {
  auralis: {
    '5 ML': 650,
    '10 ML': 1150,
    '30 ML': 2450,
    '50 ML': 3650,
    '100 ML': 5850,
  },
  veloura: {
    '50 ML': 3850,
    '100 ML': 6200,
  },
  elaria: {
    '5 ML': 650,
    '50 ML': 3650,
    '100 ML': 5850,
  },
  'obsidian-mind': {
    '5 ML': 650,
    '50 ML': 3850,
    '100 ML': 6200,
  },
  rosalind: {
    '5 ML': 650,
    '50 ML': 3650,
  },
  lunavelle: {
    '50 ML': 3650,
  },
  'gold-veil': {
    '100 ML': 5950,
  },
  'phantom-desire': {
    '50 ML': 4200,
  },
  'ain-al-qurat': {
    '15 ML': 2200,
  },
  'candle-daisy-bloom': {
    'Set of 6': 1200,
    'Set of 12': 1900,
  },
  'candle-luna-bloom': {
    '380g': 1800,
  },
  'candle-iced-coffee': {
    '350g': 1800,
  },
  'candle-black-tin': {
    '160g': 700,
  },
  'candle-colorful-glow': {
    '220g': 1400,
  },
  'botanical-resin-coasters': {
    'Set of 2': 950,
    'Set of 4': 1750,
    'Set of 6': 2400,
  },
  'candle-shot-glass': {
    '60g': 400,
  }
};
