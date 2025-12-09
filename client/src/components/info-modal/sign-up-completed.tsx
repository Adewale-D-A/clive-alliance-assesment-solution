"use client";
import { useCallback } from "react";
import { CheckCircle, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../_shared/dialog";
import { Button } from "../_shared/button";

export default function SignUpCompletedModal({
  open,
  action,
}: {
  open: boolean;
  action?: () => void;
}) {
  const confirm = useCallback(() => {
    action?.();
  }, [action]);

  const onClose = (val: boolean) => {
    action?.();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <div className={` w-full flex items-center flex-col gap-8 my-6`}>
          <div className="w-full flex items-center flex-col gap-5 text-green-500">
            <CheckCircle className="w-24 h-24" />
            <h4 className={`font-semibold text-3xl`}>Signup Successful</h4>
            <p className=" text-sm text-center">
              Welcome onboard, your accound was been created successfully.
              Continue to login
            </p>
          </div>

          <div className=" flex items-center gap-3">
            <Button
              type="button"
              onClick={() => confirm()}
              className=" w-fit px-5"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
