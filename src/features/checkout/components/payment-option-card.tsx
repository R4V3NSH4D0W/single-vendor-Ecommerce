"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ChevronLeft, CreditCard } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  PaymentInformationFormValues,
  paymentInformationSchema,
} from "../schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { setPaymentInfo, setStep } from "../state/checkoutSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function PaymentOpionCard() {
  const dispatch = useAppDispatch();
  const paymentInfo = useAppSelector((state) => state.checkout.paymentInfo);
  const form = useForm<z.infer<typeof paymentInformationSchema>>({
    resolver: zodResolver(paymentInformationSchema),
    defaultValues: {
      cardNumber: paymentInfo?.cardNumber ?? "",
      cvv: paymentInfo?.cvc ?? "",
      expirationDate: paymentInfo?.expiry ?? "",
      nameOnCard: paymentInfo?.nameOnCard ?? "",
    },
  });
  const onSubmit = async (values: PaymentInformationFormValues) => {
    dispatch(
      setPaymentInfo({
        ...values,
        expiry: values.expirationDate,
        cvc: values.cvv,
      })
    );
    dispatch(setStep("confirmation"));
  };

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  const handleBack = () => {
    dispatch(setStep("shipping"));
  };

  return (
    <div className="p-0 w-full lg:w-[60%]">
      <Card className="bg-transparent border-0 shadow-none w-full">
        <CardHeader className=" p-0">
          <CardTitle>
            <p className="text-2xl font-bold">Payment</p>
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className=" p-0">
              <div className=" border p-4 rounded-md">
                <div className=" flex flex-row gap-2">
                  <CreditCard />
                  <h1 className=" font-bold">Credit Card</h1>
                </div>
                <FormField
                  name="cardNumber"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <label className="text-sm font-semibold mt-4">
                        Card Number
                      </label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          required
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="nameOnCard"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <label className="text-sm font-semibold mt-4">
                        Card Number
                      </label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="John Smith"
                          required
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-4 w-full mt-4">
                  <FormField
                    name="expirationDate"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <label className="text-sm font-semibold">
                          Expire Date
                        </label>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="YY/MM"
                            required
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="cvv"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <label className="text-sm font-semibold">CVC</label>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="123"
                            required
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <div className=" flex flex-row justify-between">
              <Button variant="ghost" onClick={handleBack}>
                <ChevronLeft />
                Back to Shipping Method
              </Button>
              <Button>Continue to Preview</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default PaymentOpionCard;
