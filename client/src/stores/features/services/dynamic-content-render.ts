import type { DynamicRenderOptionsType } from "../../../components/dynamic-renders";
import { createSlice } from "@reduxjs/toolkit";

// NOTE: metadata expected optional constants
// {
// id: "" //Primary ID, often used to target specific service calls
// render_location_id: "" //Location ID must match render intended page position which of the enum DYNAMIC_CONTENT_RENDERS
// }
export const dynamicContentRendering = createSlice({
  name: "dynamic-content-rendering",
  initialState: {
    value: {
      show: false,
      title: "",
      render: "Null" as DynamicRenderOptionsType,
      metadata: null as any, //This contains extra data that can be passed to perfom additional actions
    },
  },
  reducers: {
    renderContent: (state, action) => {
      state.value.show = true;
      state.value.title = action?.payload?.title || "";
      state.value.render = action?.payload?.render || "Null";
      state.value.metadata = action?.payload?.metadata;
    },
    destroyContent: (state) => {
      state.value.show = false;
      state.value.title = "";
      state.value.render = "Null";
      state.value.metadata = null;
    },
  },
});

export const { renderContent, destroyContent } =
  dynamicContentRendering.actions;

export default dynamicContentRendering.reducer;
