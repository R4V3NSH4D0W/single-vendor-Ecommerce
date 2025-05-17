import React, { useState } from "react";
import { AddressInformationFromSchema } from "../schema";
import { cx } from "class-variance-authority";
import { useUpdateAddressDefault, useDeleteAddress } from "../api/use-address";
import EditAddressFromDialouge from "./edit-address-form";
import { ConfirmAlertDialog } from "@/components/confirm-alert-dialouge";

type AddressCardProps = AddressInformationFromSchema & {
  id: string;
};

function AddressCard({
  id,
  label,
  isDefault,
  city,
  country,
  postalCode,
  state,
  street,
}: AddressCardProps) {
  const { mutate: updateDefault, isPending: isUpdatingDefault } =
    useUpdateAddressDefault();
  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleStatusUpdate = () => {
    updateDefault({ isDefault: true, addressId: id });
  };

  const handleDelete = () => {
    deleteAddress(id);
  };

  return (
    <div
      className={cx(
        "border p-4 rounded-md",
        isDefault && "bg-accent border-primary",
        isDeleting && "opacity-50 pointer-events-none"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className=" flex flex-row justify-between">
          <label className="text-lg font-semibold">{label}</label>
          {isDefault && (
            <label className="flex justify-end text-sm text-green-600 font-medium">
              Default
            </label>
          )}
        </div>
        <label>{street}</label>
        <label>
          {city}, {state} {postalCode}
        </label>
        <label>{country}</label>
      </div>
      <div className="space-x-4 mt-4">
        <button className=" cursor-pointer" onClick={() => setIsEditOpen(true)}>
          Edit
        </button>

        <ConfirmAlertDialog
          trigger={
            <button
              className="text-red-500 cursor-pointer"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          }
          title="Confirm Deletion"
          description="Are you sure you want to delete this address? This action cannot be undone."
          actionLabel="Delete"
          onConfirm={handleDelete}
          isLoading={isDeleting}
          disabled={isDeleting}
        />

        {!isDefault && (
          <button
            onClick={handleStatusUpdate}
            className=" cursor-pointer"
            disabled={isUpdatingDefault}
          >
            {isUpdatingDefault ? "Updating..." : "Set as Default"}
          </button>
        )}
      </div>

      <EditAddressFromDialouge
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        address={{
          id,
          label,
          city,
          state,
          postalCode,
          street,
          country,
          isDefault,
        }}
      />
    </div>
  );
}

export default AddressCard;
