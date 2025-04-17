export interface Review {
    id: string;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified?: boolean;
    userId?:string,
  }
  
  export type ProductSpecification = {
    key: string;
    value: string;
  };
  
  
  export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
    images: string[];
    colors: string[];
    sizes: string[];
    tags: string[];
    stock: number;
    categoryLabel: string;
    rating?: number;
    reviewCount?: number;
    category: string;
    sku: string;
    care: string;
    specifications: ProductSpecification[];
    reviews: Review[];
    createdAt: string;
    updatedAt: string;
    isFeatured:boolean;
  }

  export type ProductColumn = {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    isFeatured: boolean;
    createdAt: string;
  };