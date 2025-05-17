import * as React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ConfirmAlertDialogProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export function ConfirmAlertDialog({
  trigger,
  title,
  description,
  actionLabel = "Confirm",
  onConfirm,
  isLoading = false,
  disabled = false,
}: ConfirmAlertDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          <AlertDialogCancel disabled={disabled || isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 text-white"
            onClick={handleConfirm}
            disabled={disabled || isLoading}
          >
            {isLoading ? "Processing..." : actionLabel}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
