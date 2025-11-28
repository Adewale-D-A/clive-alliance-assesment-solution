import { createSlice } from "@reduxjs/toolkit";

export const navMenuProperties = createSlice({
  name: "navigation-menu-functionality",
  initialState: {
    value: {
      fullMenuView: true,
      secondaryMenu: false,
    },
  },
  reducers: {
    toggleMenuView: (state) => {
      state.value.fullMenuView = !state.value.fullMenuView;
    },
    changeFullMenuViewState: (state, action) => {
      state.value.fullMenuView = Boolean(action?.payload?.state);
    },
    changeSecondaryMenuViewState: (state, action) => {
      const show = Boolean(action?.payload?.state);
      state.value.secondaryMenu = show;
    },
  },
});

export const {
  toggleMenuView,
  changeFullMenuViewState,
  changeSecondaryMenuViewState,
} = navMenuProperties.actions;

export default navMenuProperties.reducer;
