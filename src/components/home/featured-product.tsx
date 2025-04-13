import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "../product/product-card";

const featuredProducts = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600",
    category: "Clothing",
    isNew: true,
    badge: "New",
  },
  {
    id: 2,
    name: "Minimalist Leather Wallet",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Ceramic Coffee Mug",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600",
    category: "Home",
  },
  {
    id: 4,
    name: "Essential Fragrance No.5",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600",
    category: "Beauty",
    badge: "Popular",
  },
];
const FeaturedProduct = () => {
  return (
    <section className="py-16 md:py-24">
      <div className=" container mx-auto p-4">
        <div className=" flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h2 className=" text-3xl font-bold mb-2">Featured Product</h2>
            <p className=" text-muted-foreground">
              Our most loved products by our customers
            </p>
          </div>
          <Button variant="ghost" asChild className="mt-4 md:mt-0">
            <Link href="/products" className="flex items-center gap-2">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
