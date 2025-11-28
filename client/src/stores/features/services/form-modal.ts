import type { FormModalRenderOptionsType } from "../../../components/dynamic-renders/modal-renders";
import { createSlice } from "@reduxjs/toolkit";

// NOTE: metadata expected optional constants
// {
// w_classname: "" //Modal centent CSS class property e.g. custom width etc.
// d_variant: "" //Dialog content variant which can only be "default" || "alignRight" as of the time of writing this comment.
// }
export const formModal = createSlice({
  name: "form-modals",
  initialState: {
    value: {
      show: false,
      title: "",
      render: "Null" as FormModalRenderOptionsType,
      metadata: null as any, //This contains extra data that can be passed to perfom additional actions
    },
  },
  reducers: {
    openFormModal: (state, action) => {
      state.value.show = true;
      state.value.title = action?.payload?.title || "";
      state.value.render = action?.payload?.render || "Null";
      state.value.metadata = action?.payload?.metadata;
    },
    closeFormModal: (state) => {
      state.value.show = false;
      state.value.title = "";
      state.value.render = "Null";
      state.value.metadata = null;
    },
  },
});

export const { openFormModal, closeFormModal } = formModal.actions;

export default formModal.reducer;
