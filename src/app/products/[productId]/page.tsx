import FeaturedProduct from "@/components/home/featured-product";
import ProductPicker from "@/features/product/components/product-picker";
import ProductTab from "@/features/product/components/product-tabs";
import SwitchImage from "@/features/product/components/switch-image";
import { RotateCw, Truck } from "lucide-react";
import React from "react";

const productData = {
  id: 1,
  name: "Classic Cotton T-Shirt",
  price: 29.99,
  description:
    "Our signature t-shirt made from premium cotton. Soft, breathable, and designed to last with a comfortable fit for everyday wear.",
  features: [
    "Premium organic cotton",
    "Ethically manufactured",
    "Pre-shrunk fabric",
    "Tailored fit",
    "Available in multiple colors and sizes",
  ],
  images: [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800",
    "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=800",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
  ],
  colors: ["White", "Black", "Navy"],
  sizes: ["S", "M", "L", "XL"],
  inStock: true,
  rating: 4.5,
  reviewCount: 128,
  category: "Clothing",
  sku: "CT-001",
  material: "100% Organic Cotton",
  care: "Machine wash cold, tumble dry low",
  specifications: {
    Material: "100% Organic Cotton",
    Weight: "180g/m²",
    Care: "Machine wash cold, tumble dry low",
    Origin: "Made in Portugal",
    Fit: "Regular fit, true to size",
  },
  reviews: [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "March 15, 2025",
      comment:
        "This is my go-to t-shirt. The fabric is soft yet durable, and the fit is perfect. I've bought it in multiple colors!",
      verified: true,
    },
    {
      id: 2,
      name: "James K.",
      rating: 4,
      date: "February 28, 2025",
      comment:
        "Great quality and comfortable fit. The only reason I'm giving 4 stars is because the white is a bit see-through.",
      verified: true,
    },
    {
      id: 3,
      name: "Elena P.",
      rating: 5,
      date: "January 12, 2025",
      comment:
        "Excellent t-shirt that has held up well after multiple washes. The color hasn't faded at all.",
      verified: false,
    },
  ],
};

function ProductDetailPage() {
  const product = productData;
  return (
    <>
      <div className=" container mx-auto px-4 py-12">
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12">
          <SwitchImage product={product} />
          <div>
            <p className=" uppercase text-muted-foreground text-sm mb-2">
              {product.category}
            </p>
            <h1 className=" text-3xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : i < product.rating
                        ? "text-yellow-400 fill-current opacity-50"
                        : "text-gray-300 fill-current"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </p>
            </div>
            <p className="text-2xl font-bold mb-4">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-muted-foreground mb-8">{product.description}</p>
            <ProductPicker product={product} />
            <div className="space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-muted-foreground">
                    Free standard shipping on orders over $50. Expedited
                    shipping options available at checkout.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCw className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Easy Returns</h4>
                  <p className="text-sm text-muted-foreground">
                    Not the right fit? Return within 30 days for a full refund
                    or exchange.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductTab product={product} />
      </div>
      <div className="mt-20">
        <FeaturedProduct />
      </div>
    </>
  );
}

export default ProductDetailPage;
