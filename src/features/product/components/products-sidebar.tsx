"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Funnel } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const categories = ["All", "Clothing", "Accessories", "Home", "Beauty"];

function ProductSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [showFilter, setShowFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

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
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-muted-foreground">Under $50</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-muted-foreground">
                  $50 - $100
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-muted-foreground">
                  $100 - $200
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-muted-foreground">$200+</span>
              </label>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default ProductSidebar;
