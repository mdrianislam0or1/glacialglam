export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  material: string;
  features: string[];
  images: string[];
  reviews: Review[];
  availability: boolean;
  relatedProducts: string[];
}

export interface Review {
  username: string;
  rating: number;
  comment: string;
}
