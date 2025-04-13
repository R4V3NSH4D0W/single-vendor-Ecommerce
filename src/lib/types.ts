export interface Review {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
  }
  
 export interface ProductSpecifications {
    Material: string;
    Weight: string;
    Care: string;
    Origin: string;
    Fit: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    features: string[];
    images: string[];
    colors: string[];
    sizes: string[];
    inStock: boolean;
    rating: number;
    reviewCount: number;
    category: string;
    sku: string;
    material: string;
    care: string;
    specifications: ProductSpecifications;
    reviews: Review[];
  }
  