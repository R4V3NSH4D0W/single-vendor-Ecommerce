"use client";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { Heart, ShoppingBag } from "lucide-react";
import React, { useState } from "react";
interface ProductPickerProps {
  product: Product;
}

function ProductPicker({ product }: ProductPickerProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // if (!selectedSize || !selectedColor) {
    //   toast({
    //     title: "Please select options",
    //     description: "You must select both size and color before adding to cart.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // toast({
    //   title: "Added to cart",
    //   description: `${quantity} × ${product.name} (${selectedColor}, ${selectedSize}) added to your cart.`,
    // });

    console.log("Add to cart:", {
      productId: product.id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Color</h3>
          <span className="text-sm text-muted-foreground">
            {selectedColor ? selectedColor : "Select a color"}
          </span>
        </div>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded-md ${
                selectedColor === color
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Size</h3>
          <span className="text-sm text-muted-foreground">
            {selectedSize ? selectedSize : "Select a size"}
          </span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 flex items-center justify-center border rounded-md ${
                selectedSize === size
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center border border-input rounded-md">
          <button
            className="px-3 py-2 text-lg"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            className="px-3 py-2 text-lg"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
        <Button
          className="flex-1 py-6"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>

        <Button variant="outline" size="icon" className="h-12 w-12">
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}

export default ProductPicker;
