"use client";
import { useCallback } from "react";
import { Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../_shared/dialog";
import { Button } from "../_shared/button";

export default function DeleteConfirmationModal({
  open,
  onOpenChange,
  isLoading,
  confirmDelete,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  confirmDelete?: () => PromiseLike<unknown>;
  isLoading?: boolean;
}) {
  const confirm = useCallback(async () => {
    await confirmDelete?.();
    onOpenChange(false);
  }, [confirmDelete]);

  const onClose = (val: boolean) => {
    onOpenChange(val);
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Delete</DialogTitle>
        <div className={` w-full flex items-center flex-col gap-8 my-6`}>
          <Trash className=" text-red-500 h-24 w-24" />
          <p className=" text-sm font-normal text-[#475467]">
            Are you sure you want to delete?
          </p>

          <div className=" flex items-center gap-3">
            <Button
              type="button"
              isLoading={isLoading}
              onClick={() => confirm()}
              className=" w-fit px-5"
              variant={"destructive"}
            >
              Confirm
            </Button>
            <Button
              type="button"
              disabled={false}
              onClick={() => onClose(false)}
              className=" w-fit px-5"
            >
              No, Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
