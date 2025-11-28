import type { InfoRenderOptionsType } from "../../../components/info-modal";
import { createSlice } from "@reduxjs/toolkit";

type PopupVariant = "info" | "action";
export const infoBar = createSlice({
  name: "information-popups",
  initialState: {
    value: {
      show: false,
      title: "",
      message: "",
      isError: false,
      type: "info" as PopupVariant,
      render: "Null" as InfoRenderOptionsType,
    },
  },
  reducers: {
    openInfobar: (state, action) => {
      state.value.show = true;
      state.value.message = action?.payload?.message || "";
      state.value.title = action?.payload?.title || "";
      state.value.isError = Boolean(action?.payload?.isError);
      state.value.render = action?.payload?.render || "Null";
      state.value.type = action?.payload?.type || "info";
    },
    closeInfoBar: (state) => {
      state.value.show = false;
      state.value.title = "";
      state.value.message = "";
      state.value.type = "info";
      state.value.isError = false;
      state.value.render = "Null";
    },
  },
});

export const { openInfobar, closeInfoBar } = infoBar.actions;

export default infoBar.reducer;
