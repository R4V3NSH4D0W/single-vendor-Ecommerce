import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    options?: Record<string, string>;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex py-4 border-b last:border-0 p-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Link href={`/products/${item.id}`}>
          <Image
            src={item.image}
            alt={item.name}
            height={20}
            width={20}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {item.options &&
                Object.entries(item.options).map(([key, value]) => (
                  <span key={key}>
                    {key}: {value}
                    <br />
                  </span>
                ))}
            </p>
          </div>
          <p className="font-medium">${item.price.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
