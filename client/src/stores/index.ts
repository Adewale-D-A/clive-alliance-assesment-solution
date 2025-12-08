import { configureStore, combineReducers } from "@reduxjs/toolkit";

//user
import authUser from "./features/auth/auth";
import navMenuProperties from "./features/app-native-features/nav-menu";
import infoBar from "./features/app-native-features/info-modal";
import formModal from "./features/services/form-modal";
import dynamicContentRendering from "./features/services/dynamic-content-render";

// API
import transactionsStoreData from "./features/services/API/transactions/transaction";

const appReducer = combineReducers({
  //app functionality
  navMenuProperties,
  infoBar,
  formModal,
  dynamicContentRendering,
  // api -services
  transactionsStoreData,
  auth: authUser,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === "RESET_STORE") {
    state = undefined; // Wipe entire store
  }
  return appReducer(state, action);
};

export const careStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof careStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
