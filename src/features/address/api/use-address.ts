import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddressInformationFromSchema } from "../schema";

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      label,
      state,
      street,
      city,
      country,
      postalCode,
      isDefault,
    }: AddressInformationFromSchema) => {
      const response = await client.api.addresses.$post({
        json: {
          state,
          label,
          street,
          city,
          country,
          postalCode,
          isDefault,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          (data as any)?.error || (data as any)?.message || "Failed to create address"
        );
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  });
};

export const useUpdateAddressDefault = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      isDefault,
      addressId,
    }: { isDefault: boolean; addressId: string }) => {
      console.log("addressId",addressId)
      console.log("isDefault",isDefault)

      const response = await client.api.addresses.default[":id"].$put({
        param: {
          id: addressId,
        },
        json: {
          isDefault,
        },
      });

      const data = await response.json();
      console.log("data",data)

      if (!response.ok) {
        throw new Error(
          (data as any)?.error || (data as any)?.message || "Failed to update default address"
        );
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Default address updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  });
};

export const useGetAddress = ()=>{

    return useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await client.api.addresses.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }

      return response.json();
    },
  });
}

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      label,
      state,
      street,
      city,
      country,
      postalCode,
      isDefault,
    }: AddressInformationFromSchema & { id: string }) => {
      const response = await client.api.addresses[":id"].$put({
        param: { id },
        json: {
          label,
          state,
          street,
          city,
          country,
          postalCode,
          isDefault,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          (data as any)?.error || (data as any)?.message || "Failed to update address"
        );
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (addressId: string) => {
      const response = await client.api.addresses[":id"].$delete({
        param: { id: addressId },
      });

      if (!response.ok) {
        const data = await response.json();
     throw new Error(
          (data as any)?.error || (data as any)?.message || "Failed to Delete address"
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  });
};
