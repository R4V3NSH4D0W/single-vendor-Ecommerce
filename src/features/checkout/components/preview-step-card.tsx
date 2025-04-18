"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React from "react";
import {
  Truck,
  CreditCard,
  User,
  MapPin,
  Mail,
  Phone,
  Lock,
  ChevronLeft,
  Wallet,
} from "lucide-react";
import { setStep } from "../state/checkoutSlice";
import { Button } from "@/components/ui/button";

function PreviewStepCard() {
  const shippingInfo = useAppSelector((state) => state.checkout.shippingInfo);
  const paymentInfo = useAppSelector((state) => state.checkout.paymentInfo);
  const paymentMethod = useAppSelector((state) => state.checkout.paymentMethod);
  const shippingMethod = useAppSelector(
    (state) => state.checkout.shippingMethod
  );
  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(setStep("payment"));
  };

  const handleCheckout = async () => {
    const orderPayload = {
      shippingInfo,
      paymentInfo,
      shippingMethod,
      paymentMethod,
    };
    console.log(orderPayload);
  };

  return (
    <div className="w-full lg:w-[60%]">
      <Card className="bg-background shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <div className="bg-muted p-2 rounded-full">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>

            <h1 className="text-2xl font-bold">Order Preview</h1>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Shipping Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {shippingInfo?.firstName} {shippingInfo?.lastName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {shippingInfo?.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {shippingInfo?.phone}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {shippingInfo?.address}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">City:</span> {shippingInfo?.city}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Postal Code:</span>{" "}
                {shippingInfo?.zipCode}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Country:</span>{" "}
                {shippingInfo?.country}
              </div>
            </div>
          </div>

          {/* Shipping Method Section */}
          {shippingMethod && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Shipping Method</h2>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md">
                <div>
                  <p className="font-medium">{shippingMethod.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Estimated delivery: {shippingMethod.duration}
                  </p>
                </div>
                <p className="font-medium">${shippingMethod.cost.toFixed(2)}</p>
              </div>
            </div>
          )}
          {paymentMethod === "card" && paymentInfo && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Payment Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <p>
                    <span className="font-medium">Card Holder:</span>{" "}
                    {paymentInfo.nameOnCard}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <p>
                    <span className="font-medium">Card Number:</span> •••• ••••
                    •••• {paymentInfo.cardNumber?.slice(-4)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Expiry Date:</span>{" "}
                  {paymentInfo.expiry}
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Your payment details are securely encrypted
                  </p>
                </div>
              </div>
            </div>
          )}
          {paymentMethod === "cod" && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>
              <div className="flex items-center gap-4 p-3">
                <div className="flex-1">
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    You&apos;ll pay in cash when your order arrives
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className=" flex flex-row justify-between mt-4">
        <Button variant="ghost" onClick={handleBack}>
          <ChevronLeft />
          Back to Payment Method
        </Button>
        <Button onClick={handleCheckout}>
          {paymentMethod === "cod"
            ? "Place Order with COD"
            : "Proceed to Checkout"}
        </Button>
      </div>
    </div>
  );
}

export default PreviewStepCard;
