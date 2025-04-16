import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType,InferResponseType } from "hono";


import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { client } from "@/lib/rpc";

type ResponseType= InferResponseType<typeof client.api.auth.register['$post']>

type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

export const useRegister =()=>{
    const router = useRouter();
    const queryclient = useQueryClient();
    const mutation= useMutation<ResponseType,Error,RequestType>({
        mutationFn:async({json})=>{
            const response = await client.api.auth.register["$post"]({json});
    

            if(!response.ok){
                throw new Error("Failed to Register");
            }
            
            return await response.json();

        },
        onSuccess:()=>{
            toast.success("registered successfully");
            router.refresh();
            queryclient.invalidateQueries({queryKey:["current"]});

        },
        onError:()=>{
            toast.error("Failed to Register")
        }
    })
    return mutation;
}