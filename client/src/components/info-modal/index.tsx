"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/store-hooks";
import { closeInfoBar } from "../../stores/features/app-native-features/info-modal";
import { Button } from "../_shared/button";
import { Dialog, DialogContent, DialogTitle } from "../_shared/dialog";
import SuccessPrompt from "./slots/success-prompt";
import ErrorPrompt from "./slots/error-prompt";
import DeleteConfirmation from "./slots/delete-confirmation-prompt";

const InfoModal = () => {
  const dispatch = useAppDispatch();
  const { show, title, message, type, render } = useAppSelector(
    (state) => state.infoBar.value
  );

  const closeModal = useCallback(() => {
    dispatch(closeInfoBar());
  }, []);
  return (
    <Dialog open={show} onOpenChange={closeModal}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        {
          //@ts-ignore
          renderOptions({ message })[render] ?? <></>
        }
        {type === "info" && (
          <div className=" w-full flex justify-center mt-3">
            <Button
              type="button"
              onClick={() => closeModal()}
              className="w-fit px-5"
            >
              Okay
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const renderOptions = ({ message }: { message?: string }) => {
  return {
    Null: <></>,
    SuccessPrompt: <SuccessPrompt message={message} />,
    ErrorPrompt: <ErrorPrompt message={message} />,
    DeleteConfirmation: <DeleteConfirmation />,
  };
};

export type InfoRenderOptionsType = keyof ReturnType<typeof renderOptions>;
export default InfoModal;
