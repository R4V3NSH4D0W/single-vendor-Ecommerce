"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  const queryclient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });
      console.log("login Response",response);
      if(!response.ok){
        console.log("login error",response);
        throw new Error("Failed to log in");
    }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged in")
      router.refresh();
      queryclient.invalidateQueries({ queryKey: ["current"] });
    },
    onError:(error)=>{
      console.log("login error",error);
      toast.error("Failed to log in");
    }
  });

  return mutation;
};
