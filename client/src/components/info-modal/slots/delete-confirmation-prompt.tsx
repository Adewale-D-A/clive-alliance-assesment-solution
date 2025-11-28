import { useCallback } from "react";
import { Trash } from "lucide-react";
import { Button } from "../../_shared/button";
import { useAppDispatch } from "../../../stores/store-hooks";
import { closeInfoBar } from "../../../stores/features/app-native-features/info-modal";

export default function DeleteConfirmation({
  isLoading,
  message = "Are you sure you want to delete?",
  confirmDelete,
}: {
  isLoading?: boolean;
  message?: string;
  confirmDelete?: () => PromiseLike<unknown>;
}) {
  const dispatch = useAppDispatch();

  const confirm = useCallback(async () => {
    await confirmDelete?.();
    dispatch(closeInfoBar());
  }, [confirmDelete]);

  const closeModal = useCallback(() => {
    dispatch(closeInfoBar());
  }, []);
  return (
    <div className={` w-full flex items-center flex-col gap-8 my-6`}>
      <Trash className=" text-red-500 h-24 w-24" />
      <p className=" text-sm font-normal text-[#475467]">{message}</p>

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
          onClick={() => closeModal()}
          className=" w-fit px-5"
        >
          No, Cancel
        </Button>
      </div>
    </div>
  );
}
