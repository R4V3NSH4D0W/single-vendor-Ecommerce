"use client";
import { useGetOrder } from "@/features/order/api/use-get-order";
import React from "react";

function OrdersPage() {
  const { data, isLoading } = useGetOrder();
  console.log(data);
  return <div>OrdersPage</div>;
}

export default OrdersPage;
