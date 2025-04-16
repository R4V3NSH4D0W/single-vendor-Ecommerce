"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Funnel } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Home Appliances",
  "Books",
  "Footwear",
];
const priceRanges = [
  { label: "Under $50", value: "under-50", min: 0, max: 49 },
  { label: "$50 - $100", value: "50-100", min: 50, max: 100 },
  { label: "$100 - $200", value: "100-200", min: 100, max: 200 },
  { label: "$200+", value: "200+", min: 200, max: null },
];

function ProductSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [showFilter, setShowFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory("All");
    }
  }, [categoryParam]);

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedPrice === value) {
      setSelectedPrice(null);
      params.delete("price");
    } else {
      setSelectedPrice(value);
      params.set("price", value);
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div>
      <aside className=" w-full md:w-64 space-y-6">
        <Button
          variant="outline"
          className=" w-full  justify-between h-12 mt-4 lg:hidden"
          onClick={() => setShowFilter(!showFilter)}
        >
          <div className=" flex flex-row items-center gap-2">
            <Funnel />
            Filters
          </div>
          {showFilter ? (
            <ChevronUp className=" h-4 w-4" />
          ) : (
            <ChevronDown className=" h-4 w-4" />
          )}
        </Button>
        <div
          className={` space-y-6 ${showFilter ? " block" : "hidden md:block"}`}
        >
          <div>
            <h1 className=" text-md font-bold inline-block">Categories</h1>
            <ul className=" space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`block w-full text-left py-1 ${
                      activeCategory === category
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-primary transition-colors"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedPrice === range.value}
                    onChange={() => handlePriceChange(range.value)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default ProductSidebar;
