import Image from "next/image";
import Link from "next/link";
import React from "react";

const categories = [
  {
    name: "Apparel",
    description: "Premium quality clothing",
    image:
      "https://images.unsplash.com/photo-1618354691229-88d47f285158?q=80&w=600",
    link: "/products/category/apparel",
  },
  {
    name: "Accessories",
    description: "Complete your look",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600",
    link: "/products/category/accessories",
  },
  {
    name: "Home",
    description: "Design for living",
    image:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=600",
    link: "/products/category/home",
  },
];

const Categories = () => {
  return (
    <section className=" py-16 md:py-24 bg-secondary/30">
      <div className=" container mx-auto px-4">
        <div className=" text-center max-w-lg mx-auto mb-12">
          <h1 className=" text-3xl font-bold mb-4">Shop by Category</h1>
          <p className=" text-muted-foreground">
            Explore our curated collections of premium essentials designed for
            modern living
          </p>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className=" group relative rounded-lg overflow-hidden  h-80 product-card-hover bg-card"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className=" absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-colors duration-500 flex flex-col p-6 text-white justify-end">
                <h1 className=" text-lg font-bold">{category.name}</h1>
                <p className=" text-white/80">{category.description}</p>
                <span className=" inline-block font-medium text-sm py-2 border-b-2 border-white w-fit transition-all group-hover:translate-x-2">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
