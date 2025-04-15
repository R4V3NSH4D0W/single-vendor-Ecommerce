import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";


export const useGetProducts= ()=>{
    const query =useQuery({
        queryKey:["products"],
        queryFn:async()=>{
            const response = await client.api.products.$get();
            if(!response.ok){
                return null;
            }

            const jsonResponse = await response.json();

            return jsonResponse;
        }

    })
    return query;
}