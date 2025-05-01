"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function OrderPlaced() {
  return (
    <div className=" w-full -mt-20">
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <CheckCircle className="h-20 w-20 text-green-500 animate-pulse mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Thank You! 🎉
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mb-6">
          Your order has been placed successfully. You’ll receive a confirmation
          email shortly with all the details.
        </p>

        <div className="flex gap-4">
          <Link href="/orders">
            <Button variant="ghost">View My Orders</Button>
          </Link>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;
