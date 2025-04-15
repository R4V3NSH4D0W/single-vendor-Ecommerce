import ProductContents from "@/features/product/components/product-contents";
import ProductSidebar from "@/features/product/components/products-sidebar";
import React from "react";

// const sortOptions = [
//   { value: "featured", label: "Featured" },
//   { value: "newest", label: "Newest" },
//   { value: "price-asc", label: "Price: Low to High" },
//   { value: "price-desc", label: "Price: High to Low" },
// ];

function ProductsPage() {
  return (
    <div className=" container mx-auto py-16 px-4">
      <h1 className=" text-3xl font-bold inline-block mb-1">
        Shop All Products
      </h1>
      <p className=" text-muted-foreground font-medium">
        Browse our collection of our premium essentials
      </p>
      <div className=" flex flex-col md:flex-row gap-6 mt-8">
        <ProductSidebar />
        <ProductContents />
      </div>
    </div>
  );
}

export default ProductsPage;
