"use client";
import CheckoutSteps from "@/features/checkout/components/checkout-steps";
import OrderSummeryCard from "@/features/checkout/components/order-summery-card";
import PaymentOpionCard from "@/features/checkout/components/payment-option-card";
import PreviewStepCard from "@/features/checkout/components/preview-step-card";
import ShippingInformationCard from "@/features/checkout/components/shipping-information-card";
import ShippingMethod from "@/features/checkout/components/shipping-method";

import { useAppSelector } from "@/store/hooks";
import React from "react";

function CheckoutClinet() {
  const currentStep = useAppSelector((state) => state.checkout.currentStep);
  return (
    <div className=" container mx-auto p-4">
      <CheckoutSteps />
      <div className="flex flex-col-reverse lg:flex-row items-start gap-8 mt-16">
        {currentStep === "initial" && <ShippingInformationCard />}
        {currentStep === "shipping" && <ShippingMethod />}
        {currentStep === "payment" && <PaymentOpionCard />}
        {currentStep === "confirmation" && <PreviewStepCard />}
        <OrderSummeryCard />
      </div>
    </div>
  );
}

export default CheckoutClinet;
