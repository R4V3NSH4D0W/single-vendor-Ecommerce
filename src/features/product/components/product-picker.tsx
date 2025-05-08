"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/state/cart-slice";
import { useWishlistToggle } from "@/lib/helpers";
import { Product } from "@/lib/types";
import { useAppDispatch } from "@/store/hooks";
import { Heart, ShoppingBag } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface ProductPickerProps {
  product: Product;
}

function ProductPicker({ product }: ProductPickerProps) {
  const isColorAvailable = product.colors.length > 0;
  const isSizeAvailable = product.sizes.length > 0;
  const isInStock = product.stock > 0;

  const dispatch = useAppDispatch();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { isInWishlist, isAdding, isRemoving, handleWishlistToggle } =
    useWishlistToggle({ productId: product.id });

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // components/ProductCard.tsx
  const handleAddToCart = () => {
    if (
      (!selectedSize && isSizeAvailable) ||
      (!selectedColor && isColorAvailable)
    ) {
      toast.error("Please select options before adding to cart");
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      })
    );
  };

  return (
    <>
      {isColorAvailable && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Color</h3>
          </div>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border rounded-md cursor-pointer ${
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
      )}

      {isSizeAvailable && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Size</h3>
          </div>
          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 flex items-center justify-center border rounded-md cursor-pointer ${
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
      )}

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center border border-input rounded-md">
          <button
            className="px-3 py-2 text-lg cursor-pointer"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            className="px-3 py-2 text-lg cursor-pointer"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>

        <Button
          className="flex-1 py-6 cursor-pointer"
          disabled={!isInStock}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {isInStock ? "Add to Cart" : "Out of Stock"}
        </Button>

        <Button
          variant="outline"
          size="icon"
          disabled={isAdding || isRemoving}
          className="h-12 w-12"
          onClick={handleWishlistToggle}
        >
          <Heart
            className={`h-4 w-4 ${
              isInWishlist ? "fill-red-500  text-red-500" : "stroke-current"
            }`}
          />
        </Button>
      </div>
    </>
  );
}

export default ProductPicker;
