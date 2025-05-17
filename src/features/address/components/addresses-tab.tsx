"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import AddressFormDialog from "./address-form-dialouge";
import AddressCard from "./address-card";
import { useGetAddress } from "../api/use-address";

function AddressesTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isPending } = useGetAddress();

  const sortedAddresses = data?.data
    ?.slice()
    ?.sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="font-semibold text-xl">Saved Addresses</label>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new Address
        </Button>
      </div>

      {isPending && <p>Loading addresses...</p>}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {sortedAddresses?.map((address) => (
          <AddressCard
            key={address.id}
            id={address.id}
            state={address.state}
            street={address.street}
            postalCode={address.postalCode}
            city={address.city}
            isDefault={address.isDefault}
            country={address.country}
            label={address?.label || ""}
          />
        ))}
      </div>

      <AddressFormDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}

export default AddressesTab;
