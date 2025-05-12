"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/conform-dialouge";
import { useOrders } from "@/features/order/api/use-order";
import { useOrderMutations } from "@/features/order/api/use-mutation";
import { formatCurrency, formatDate } from "@/lib/utils";

import { MoreVertical } from "lucide-react";
import type { Order } from "@/features/order/types";
import { OrderStatus } from "@/generated/prisma";

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);

  const { data: orders, isLoading } = useOrders(search);
  const { updateOrder, deleteOrder } = useOrderMutations();

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    const order = orders?.find((o) => o.id === orderId);
    if (order) {
      updateOrder.mutate({
        id: orderId,
        status,
        paymentStatus: order.paymentStatus,
      });
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    const colors: Record<Order["status"], string> = {
      PENDING: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
      PROCESSING: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
      SHIPPED: "bg-purple-500/20 text-purple-600 dark:text-purple-400",
      DELIVERED: "bg-green-500/20 text-green-600 dark:text-green-400",
      CANCELLED: "bg-red-500/20 text-red-600 dark:text-red-400",
    };
    return colors[status];
  };

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div className="space-y-6 container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <Input
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{order.orderNumber}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{order.user.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {order.user.email}
                  </span>
                </div>
              </TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {order.paymentStatus.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        setSelectedOrder({
                          ...order,
                          items: order.items.map((item) => ({
                            ...item,
                            images: item.product.images || [],
                          })),
                          payment:
                            order.payment === null
                              ? undefined
                              : {
                                  transactionId:
                                    order.payment.transactionId ?? undefined,
                                  last4Digits:
                                    order.payment.last4Digits ?? undefined,
                                },
                        })
                      }
                    >
                      View Details
                    </DropdownMenuItem>

                    {Object.values(OrderStatus).map((status) => (
                      <DropdownMenuItem
                        key={status}
                        onSelect={() => handleStatusChange(order.id, status)}
                      >
                        {status}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={() => setDeleteOrderId(order.id)}
                      className="text-red-600"
                    >
                      Delete Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Order Details Dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="sm:max-w-3xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Order Details - {selectedOrder.orderNumber}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Shipping Information</h3>
                    <div className="text-sm">
                      <p>{selectedOrder.shippingAddress}</p>
                      <p>
                        {selectedOrder.shippingCity},{" "}
                        {selectedOrder.shippingState}
                      </p>
                      <p>{selectedOrder.shippingPostalCode}</p>
                      <p>{selectedOrder.shippingCountry}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold">Payment Information</h3>
                    <div className="text-sm">
                      <p>Method: {selectedOrder.paymentMethod}</p>
                      <p>Status: {selectedOrder.paymentStatus}</p>
                      {selectedOrder.payment?.transactionId && (
                        <p>
                          Transaction ID: {selectedOrder.payment.transactionId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 items-start p-4 bg-muted/25 rounded-lg"
                      >
                        {item.product.images?.[0] && (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={120}
                            height={80}
                            className="rounded-lg border"
                          />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <div className="text-sm text-muted-foreground mt-1">
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: {formatCurrency(item.price)}</p>
                            {item.size && <p>Size: {item.size}</p>}
                            {item.color && <p>Color: {item.color}</p>}
                          </div>
                        </div>
                        <div className="font-medium">
                          {formatCurrency(item.quantity * item.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{formatCurrency(selectedOrder.shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Tax (
                      {Math.round(
                        (selectedOrder.tax / selectedOrder.subtotal) * 100
                      )}
                      %):
                    </span>
                    <span>{formatCurrency(selectedOrder.tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteOrderId}
        onOpenChange={() => setDeleteOrderId(null)}
        onConfirm={() => {
          if (deleteOrderId) {
            deleteOrder.mutate(deleteOrderId);
            setDeleteOrderId(null);
          }
        }}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
      />
    </div>
  );
}
