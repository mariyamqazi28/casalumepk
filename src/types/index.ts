export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
  family: 'Woody & Oriental' | 'Floral & Sensual' | 'Fresh Citrus & Aquatic' | 'Warm Amber & Gourmand' | 'Aromatic & Herbal';
  longevity: string;
  projection: string;
  mood: string;
}

export type ProductCategory = 'perfume' | 'extrait' | 'discovery' | 'candle' | 'attar';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  volume: string;
  availableVolumes: string[];
  category: ProductCategory;
  image: string;
  galleryImages: string[];
  notes: FragranceNotes;
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  stock: number;
  inStock: boolean;
  collectionsOnly?: boolean;
  collectionImage?: string;
}

export interface CartItem {
  id: string; // composite key: `${product.id}-${selectedVolume}`
  product: Product;
  quantity: number;
  selectedVolume: string;
  unitPrice: number;
}

export interface CheckoutFormState {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  preferredTiming: string;
  paymentMethod: 'cod' | 'bank_transfer';
  orderNotes: string;
}

export interface OrderConfirmationData {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customer: CheckoutFormState;
  createdAt: string;
  estimatedDelivery: string;
}

export interface LayeringResult {
  score: number;
  title: string;
  character: string;
  notesHarmony: string[];
  description: string;
  idealTime: string;
  vibe: string;
}
