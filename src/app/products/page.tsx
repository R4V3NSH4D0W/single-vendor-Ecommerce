"use client";
import { useState, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import ProductCard from "@/components/product/product-card";
import Link from "next/link";

// Mock product data
const allProducts = [
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
  {
    id: 5,
    name: "Cotton Lounge Pants",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=600",
    category: "Clothing",
  },
  {
    id: 6,
    name: "Handcrafted Wood Coasters",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1603822451845-95e918d22e6c?q=80&w=600",
    category: "Home",
  },
  {
    id: 7,
    name: "Merino Wool Sweater",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600",
    category: "Clothing",
    badge: "Bestseller",
  },
  {
    id: 8,
    name: "Minimalist Tote Bag",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=600",
    category: "Accessories",
  },
];

const categories = ["All", "Clothing", "Accessories", "Home", "Beauty"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  //   const location = useLocation();

  //   useEffect(() => {
  //     // Get category from URL if present
  //     const searchParams = new URLSearchParams(location.search);
  //     const categoryParam = searchParams.get('category');

  //     if (categoryParam && categories.includes(categoryParam)) {
  //       setActiveCategory(categoryParam);
  //     } else {
  //       setActiveCategory('All');
  //     }
  //   }, [location.search]);

  useEffect(() => {
    // Filter and sort products
    let result = [...allProducts];

    // Apply category filter
    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        // For demo purposes, we'll just shuffle a bit
        result = [...result].reverse();
        break;
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        // 'featured' is default, no additional sorting needed
        break;
    }

    setFilteredProducts(result);
  }, [activeCategory, sortBy]);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
        <p className="text-muted-foreground">
          Browse our collection of premium essentials
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-6">
          <div className="md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between p-4 border border-border rounded-md bg-secondary"
            >
              <div className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                <span>Filters</span>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <div
            className={`space-y-6 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      href={
                        category === "All"
                          ? "/products"
                          : `/products?category=${category}`
                      }
                      className={`block py-1 ${
                        activeCategory === category
                          ? "font-medium text-primary"
                          : "text-muted-foreground hover:text-primary transition-colors"
                      }`}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Under $50
                  </span>
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

        {/* Product Grid */}
        <div className="flex-1">
          {/* Sort Controls */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} products
            </p>
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-input rounded-md px-2 py-1 text-sm bg-background"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
