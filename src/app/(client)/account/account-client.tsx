"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetOrder } from "@/features/order/api/use-get-order";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

import React from "react";

interface AccountClientPageProps {
  name: string;
}

function AccountClientPage({ name }: AccountClientPageProps) {
  const { data: orders } = useGetOrder();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className=" text-3xl font-bold leading-[150%]">My Account</h1>
      <p className=" mt-2">Welcome Back, {name}</p>

      <Tabs defaultValue="orders" className="mt-8 w-full">
        <div className="border-b mb-8 w-full">
          <TabsList className="flex w-full">
            <TabsTrigger value="orders" className="flex-1">
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex-1">
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex-1">
              Addresses
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              Account Settings
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="orders">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-xl font-semibold mb-4 md:mb-0">
                Order History
              </h2>
              <div className="flex space-x-2">
                <select className="border border-input rounded-md px-3 py-2 bg-background text-sm">
                  <option>All Orders</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
            </div>

            {(orders?.order ?? []).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="text-left">
                      <th className="py-3 px-4 font-medium">Order #</th>
                      <th className="py-3 px-4 font-medium">Date</th>
                      <th className="py-3 px-4 font-medium">Items</th>
                      <th className="py-3 px-4 font-medium">Total</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders?.order.map((order) => (
                      <tr key={order.id}>
                        <td className="py-4 px-4">{order.orderNumber}</td>
                        <td className="py-4 px-4">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="py-4 px-4">
                          {order.items.length} items
                        </td>
                        <td className="py-4 px-4">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === "DELIVERED"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            href={`/orders/${order.id}`}
                            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  You haven&apos;t placed any orders yet.
                </p>
                <Link
                  href="/products"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AccountClientPage;
