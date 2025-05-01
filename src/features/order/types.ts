// types/order.ts
export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type PaymentMethod = "COD" | "CARD";

export interface OrderUser {
  id: string;
  name: string;
  email: string;
}

// types/order.ts
export interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    size?: string | null;
    color?: string | null;
    images: string[];
    product: OrderProduct;
    createdAt: string;
    orderId: string;
  }
  
  export interface OrderProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    sku: string;
    variants: string[];
    tags: string[];
    sizes: string[];
    features: string[];
    careInstruction: string | null;
    images: string[];
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
    categoryId: string;
  }
  
  export interface Order {
    id: string;
    orderNumber: string;
    userId: string;
    totalAmount: number;
    subtotal: number;
    shippingCost: number;
    tax: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingPostalCode: string;
    shippingCountry: string;
    trackingNumber?: string | null;
    cancellationReason?: string | null;
    user: {
      id: string;
      name: string;
      email: string;
    };
    items: OrderItem[];
    payment?: {
      transactionId?: string;
      last4Digits?: string;
    };
  }
export interface PaginatedOrders {
  data: Order[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
}