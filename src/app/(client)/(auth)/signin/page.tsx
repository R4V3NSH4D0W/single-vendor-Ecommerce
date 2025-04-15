import SignInCard from "@/features/auth/components/sign-in-card";
import { getCurrentUser } from "@/lib/is-authenticated";
import { redirect } from "next/navigation";
import React from "react";

async function SignInPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  return <SignInCard />;
}

export default SignInPage;
