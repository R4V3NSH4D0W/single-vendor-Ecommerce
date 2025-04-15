"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Package, Save, Settings } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/features/dashboard/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ChipsInput } from "@/components/chip-input";
import { FileUpload } from "@/features/dashboard/components/file-upload";
import { useCreateProduct } from "@/features/dashboard/api/use-create-product";

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home-appliances", label: "Home Appliances" },
  { value: "books", label: "Books" },
];

function AddProduct() {
  const { mutate, error } = useCreateProduct();
  console.log(error);
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      productPrice: 0,
      productStock: 0,
      productCategory: "",
      productSKU: "",
      productVariants: [],
      productImages: [],
      productTags: [],
    },
  });
  type ProductFormValues = z.infer<typeof ProductSchema>;

  const onSubmit = async (values: ProductFormValues) => {
    const formData = new FormData();

    // Append all fields
    formData.append("productName", values.productName);
    formData.append("productDescription", values.productDescription);
    formData.append("productPrice", values.productPrice.toString());
    formData.append("productStock", values.productStock.toString());
    formData.append("productCategory", values.productCategory);
    formData.append("productSKU", values.productSKU);
    formData.append("productVariants", JSON.stringify(values.productVariants));
    formData.append("productTags", JSON.stringify(values.productTags));

    // Append image files
    values.productImages.forEach((file) => {
      if (file instanceof File) {
        formData.append("productImages", file);
      } else {
        formData.append("productImages", file);
      }
    });

    mutate(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 lg:flex-row">
            <Card className="w-full lg:w-2/3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Package size={24} />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  name="productName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-sm font-semibold">
                        Product Name
                      </label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Product Name"
                          required
                          {...field}
                          className="w-full mb-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="productDescription"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-sm font-semibold">
                        Product Description
                      </label>
                      <FormControl>
                        <Textarea
                          placeholder="Product Description"
                          required
                          {...field}
                          className="w-full mb-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <FormField
                    name="productPrice"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className=" w-full">
                        <label className="text-sm font-semibold">
                          Product Price
                        </label>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            required
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="productStock"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className=" w-full">
                        <label className="text-sm font-semibold">
                          Product Stock
                        </label>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            required
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  name="productSKU"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-semibold">
                        SKU (Stock Keeping Unit)
                      </label>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter product SKU"
                          required
                          {...field}
                          className="w-full mb-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <FormField
                    name="productVariants"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className=" w-full">
                        <label className="block text-sm font-semibold">
                          Variants
                        </label>
                        <FormControl>
                          <ChipsInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Add variants (press Enter or comma)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="productTags"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className=" w-full">
                        <label className="block text-sm font-semibold ">
                          Tags
                        </label>
                        <FormControl>
                          <ChipsInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Add tags (press Enter or comma)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Settings Card */}
            <Card className="w-full lg:w-1/3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Settings size={24} />
                  Product Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  name="productCategory"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <label className="block text-sm font-semibold mb-2">
                        Category
                      </label>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select categories" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="productImages"
                  control={form.control}
                  render={() => <FileUpload form={form} name="productImages" />}
                />
              </CardContent>
            </Card>
          </div>
          <div className="  flex lg:justify-end mt-6">
            <Button size="lg" className=" w-full lg:w-[120px]">
              <Save />
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AddProduct;
