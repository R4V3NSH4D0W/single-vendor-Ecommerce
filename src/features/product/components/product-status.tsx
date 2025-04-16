import { Badge } from "@/components/ui/badge";

const checkStockStatus = (stock: number): string => {
  if (stock > 5) {
    return "In Stock";
  } else if (stock >= 1) {
    return "Low On Stock";
  } else {
    return "Out of Stock";
  }
};

export function ProductStatus({ stock }: { stock: number }) {
  const status = checkStockStatus(stock);

  const variant =
    status === "In Stock"
      ? "inStock"
      : status === "Low On Stock"
      ? "lowStock"
      : "outOfStock";

  return (
    <Badge variant={variant} className=" text-md font-semibold mb-4 p-1 px-4">
      {status}
    </Badge>
  );
}
