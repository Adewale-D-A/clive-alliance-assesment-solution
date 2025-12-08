"use client";

import { useCallback } from "react";
import { cn } from "../../utils/cn";
import { useAppDispatch, useAppSelector } from "../../stores/store-hooks";
import { Dialog, DialogContent, DialogTitle } from "../_shared/dialog";
import { closeFormModal } from "../../stores/features/services/form-modal";
import Transact from "./contents/transact";
import ShowTransaction from "./contents/show-transaction";

const FormModal = () => {
  const dispatch = useAppDispatch();
  const { show, title, render, metadata } = useAppSelector(
    (state) => state.formModal.value
  );

  const closeModal = useCallback(() => {
    dispatch(closeFormModal());
  }, []);

  return (
    <Dialog open={show} onOpenChange={closeModal}>
      <DialogContent
        className={cn(metadata?.w_classname)}
        variant={metadata?.d_variant ?? "default"}
      >
        <DialogTitle>{title}</DialogTitle>
        {
          //@ts-ignore

          renderOptions()[render] ?? <></>
        }
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;

const renderOptions = () => {
  return {
    Null: <></>,
    Transact: <Transact />,
    ShowTransaction: <ShowTransaction />,
  };
};

export type FormModalRenderOptionsType = keyof ReturnType<typeof renderOptions>;
