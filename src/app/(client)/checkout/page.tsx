import React from "react";
import CheckoutClient from "./checkout-client";
import { getCurrentUser } from "@/lib/is-authenticated";
import { redirect } from "next/navigation";

async function CheckoutPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signup");
  }
  return <CheckoutClient />;
}

export default CheckoutPage;
