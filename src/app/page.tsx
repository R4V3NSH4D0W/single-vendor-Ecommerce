import Categories from "@/components/home/categories";
import FeaturedProduct from "@/components/home/featured-product";
import Hero from "@/components/home/hero";
import Newsletter from "@/components/home/newsletter";
import Testimonials from "@/components/home/testimonials";
import { getCurrentUser } from "@/lib/is-authenticated";

import React from "react";

async function Page() {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <main className="">
      <Hero />
      <FeaturedProduct />
      <Categories />
      <Testimonials />
      <Newsletter />
    </main>
  );
}

export default Page;
