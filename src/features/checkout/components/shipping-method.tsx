"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Truck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import clsx from "clsx";
import { setShipping } from "@/features/cart/state/cart-slice";
import { Button } from "@/components/ui/button";
import { setShippingMethod, setStep } from "../state/checkoutSlice";

const shippingMethods = [
  {
    id: 1,
    name: "Standard Shipping",
    duration: "3-5 business days",
    cost: 10.0,
  },
  {
    id: 2,
    name: "Express Shipping",
    duration: "1-2 business days",
    cost: 18.0,
  },
  {
    id: 3,
    name: "Overnight Shipping",
    duration: "Next business day",
    cost: 25.0,
  },
];

function ShippingMethod() {
  const shippingInfo = useAppSelector((state) => state.checkout.shippingInfo);
  const selectedMethodFromState = useAppSelector(
    (state) => state.checkout.shippingMethod
  );
  const dispatch = useAppDispatch();
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(
    () => selectedMethodFromState?.id ?? 1
  );

  const selectedMethod = shippingMethods.find((m) => m.id === selectedMethodId);

  useEffect(() => {
    if (selectedMethod) {
      dispatch(setShipping(selectedMethod.cost));
    }
  }, [selectedMethod, dispatch]);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  const handleBack = () => {
    dispatch(setStep("initial"));
  };

  const handleContinuePayment = () => {
    if (selectedMethod) {
      dispatch(setShippingMethod(selectedMethod));
      dispatch(setStep("payment"));
    }
  };

  return (
    <div className="p-0 w-full lg:w-[60%]">
      <Card className="bg-transparent border-0 shadow-none w-full">
        <CardHeader className="p-0">
          <CardTitle className="flex flex-row justify-between">
            <p className="text-2xl">Shipping Method</p>
            <p className="text-sm text-muted-foreground cursor-pointer hover:underline">
              Edit Shipping Info
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="bg-accent rounded-md p-4 flex flex-col">
            <label className="mb-2">Ship to:</label>
            <div className="flex flex-col text-sm text-muted-foreground">
              <label>
                {shippingInfo?.firstName} {shippingInfo?.lastName}
              </label>
              <label>{shippingInfo?.address}</label>
              <label>
                {shippingInfo?.city}, {shippingInfo?.state}{" "}
                {shippingInfo?.zipCode}
              </label>
            </div>
          </div>

          <h1 className="mt-6 mb-2 text-md font-bold">
            Select a Shipping Method:
          </h1>

          <div className="flex flex-col gap-4 mt-4">
            {shippingMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={clsx(
                  "flex justify-between items-start w-full p-4 border rounded-lg cursor-pointer transition-all",
                  selectedMethodId === method.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-accent"
                )}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    checked={selectedMethodId === method.id}
                    onChange={() => setSelectedMethodId(method.id)}
                    className="mt-1"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-medium">{method.name}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck size={18} />
                      <p className=" mt-1">{method.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm font-medium">
                  ${method.cost.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className=" flex flex-row justify-between">
          <Button variant="ghost" onClick={handleBack}>
            <ChevronLeft />
            Back to Shipping
          </Button>
          <Button onClick={handleContinuePayment}>Continue to Payment</Button>
        </div>
      </Card>
    </div>
  );
}

export default ShippingMethod;
