"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrderByID } from "@/features/order/api/use-get-order-via-id";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, CheckCircle, Package, Truck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { toast } from "sonner";
import { printReceipt } from "@/lib/print-receipt";

export default function OrderDetail() {
  const params = useParams();
  const id = params?.orderId as string;

  const { data, isLoading, error } = useGetOrderByID(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!data?.order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-8">
          We couldn&apos;t find the order you&apos;re looking for.
        </p>
        <Button asChild>
          <Link href="/account">Return to Account</Link>
        </Button>
      </div>
    );
  }

  if (error) return <div>Error fetching order details</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "SHIPPING":
      case "Out for Delivery":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "PROCESSING":
      case "Payment Confirmed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const handlePrintReceipt = () => {
    if (!data?.order) return;

    printReceipt({
      orderNumber: data.order.orderNumber,
      createdAt: formatDate(data.order.createdAt),
      userName: data.order.user.name,
      shippingAddress: `${data.order.shippingCity}, ${data.order.shippingState}, ${data.order.shippingPostalCode}, ${data.order.shippingCountry}`,
      items: data.order.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: data.order.subtotal,
      shippingCost: data.order.shippingCost,
      tax: data.order.tax,
      totalAmount: data.order.totalAmount,
    });

    toast("Receipt sent to printer", {
      description: "Your receipt is now printing.",
    });
  };

  const handleRequestReturn = () => {
    toast("Return requested", {
      description:
        "Your return request has been submitted. We'll contact you shortly.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button and order ID */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <Button variant="ghost" asChild className="mb-4 sm:mb-0 -ml-4">
          <Link href="/account" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        <div className="text-right">
          <h1 className="text-xl font-bold">
            Order #{data?.order.orderNumber}
          </h1>
          <p className="text-muted-foreground">
            Placed on {formatDate(data?.order.createdAt as string)}
          </p>
        </div>
      </div>
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                data?.order.status as string
              )}`}
            >
              {data?.order.status === "DELIVERED" ? (
                <CheckCircle className="mr-1 h-4 w-4" />
              ) : data?.order.status === "SHIPPED" ||
                data?.order.status === "PROCESSING" ? (
                <Truck className="mr-1 h-4 w-4" />
              ) : (
                <Package className="mr-1 h-4 w-4" />
              )}
              {data?.order.status}
            </span>
          </div>
          <div className="relative">
            <div className="absolute top-0 left-3 h-full w-0.5 bg-border"></div>
            <ul className="space-y-6">
              {data?.order.OrderTimelineEvent.map((event, index) => {
                const createdAt = new Date(event.createdAt);
                const isLatest =
                  index === data.order.OrderTimelineEvent.length - 1;

                return (
                  <li key={event.id} className="relative pl-10">
                    <div
                      className={`absolute left-0 top-1 h-6 w-6 rounded-full border ${
                        isLatest
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background border-muted-foreground"
                      } flex items-center justify-center`}
                    >
                      {isLatest ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-muted-foreground" />
                      )}
                    </div>
                    <div className="font-medium">{event.status}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(createdAt, "PPpp")}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-cover rounded-md mr-4"
                      />
                      <span>{item.product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Order Summary */}
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${data?.order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Shipping</span>
              <span>${data?.order.shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-muted-foreground">Tax</span>
              <span>${data?.order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>${data?.order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Shipping Address */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-medium">{data?.order.user.name}</p>
              <p>{data?.order.shippingMethod?.name}</p>
              <p>
                {data?.order.shippingCity}, {data?.order.shippingState}
                {data?.order.shippingPostalCode}
              </p>
              <p>{data?.order.shippingCountry}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data?.order.paymentMethod}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap gap-4 justify-end">
        <Button variant="outline" onClick={handlePrintReceipt}>
          Print Receipt
        </Button>
        {data?.order.status !== "DELIVERED" ? (
          <Button variant="outline" disabled>
            Request Return
          </Button>
        ) : (
          <Button variant="outline" onClick={handleRequestReturn}>
            Request Return
          </Button>
        )}
        <Button asChild>
          <a
            href={`mailto:support@example.com?subject=Help%20with%20Order%20${data?.order.orderNumber}`}
          >
            Need Help?
          </a>
        </Button>
      </div>
    </div>
  );
}
