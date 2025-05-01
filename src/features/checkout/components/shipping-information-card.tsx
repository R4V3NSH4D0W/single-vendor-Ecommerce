"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ShippingInformationFormValues,
  shippingInformationSchema,
} from "../schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setShippingInfo, setStep } from "../state/checkoutSlice";

function ShippingInformationCard() {
  const dispatch = useAppDispatch();
  const shippingInfo = useAppSelector((state) => state.checkout.shippingInfo);
  const form = useForm<z.infer<typeof shippingInformationSchema>>({
    resolver: zodResolver(shippingInformationSchema),
    defaultValues: {
      firstName: shippingInfo?.firstName ?? "",
      lastName: shippingInfo?.lastName ?? "",
      email: shippingInfo?.email ?? "",
      address: shippingInfo?.address ?? "",
      phone: shippingInfo?.phone ?? "",
      city: shippingInfo?.city ?? "",
      country: shippingInfo?.country ?? "",
      zipCode: shippingInfo?.zipCode ?? "",
      state: shippingInfo?.state ?? "",
    },
  });

  const onSubmit = async (values: ShippingInformationFormValues) => {
    dispatch(setShippingInfo(values));
    dispatch(setStep("shipping"));
  };

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <div className="p-0  w-full lg:w-[60%]">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="bg-transparent border-0 shadow-none w-full">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold">
                <p className=" text-2xl">Shipping Information</p>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 w-full">
              <div className="flex flex-col lg:flex-row gap-4 w-full">
                {/* First Name Field */}
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <label className="text-sm font-semibold">
                        First Name
                      </label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="First Name"
                          required
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Last Name Field */}
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <label className="text-sm font-semibold">Last Name</label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Last Name"
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
              <div className="flex flex-col lg:flex-row gap-4 w-full mt-4">
                {/* Email Field */}
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <label className="text-sm font-semibold">Email</label>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          required
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone Field */}
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <label className="text-sm font-semibold">Phone</label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Phone"
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
              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full mt-4 ">
                    <label className="text-sm font-semibold">Address</label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Address"
                        required
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col lg:flex-row gap-4 w-full mt-4">
                {/* City Field */}
                <FormField
                  name="city"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <label className="text-sm font-semibold">City</label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="City"
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
                  name="state"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <label className="text-sm font-semibold">State</label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="State"
                          required
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Zip Code Field */}
                <FormField
                  name="zipCode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full lg:w-1/2">
                      <label className="text-sm font-semibold">Zip Code</label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Zip Code"
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
              {/* Country Field */}
              <FormField
                name="country"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full mt-4">
                    <label className="text-sm font-semibold">Country</label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Country"
                        required
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <div className=" flex justify-end">
              <Button className=" w-full md:w-[12rem]">
                Continue to Shipping
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default ShippingInformationCard;
