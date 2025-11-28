import type { UserT } from "../../../../../types/api/service.types";
import type { PaginationType } from "../../../../../types/types";
import {
  addToListReduxHelper,
  addToPaginationHistoryReduxHelper,
  removeItemFromStoreReduxHelper,
  replaceItemInStoreReduxHelper,
} from "../../../../../utils/redux-store-helper";
import { createSlice } from "@reduxjs/toolkit";

export const usersStoreData = createSlice({
  name: "users",
  initialState: {
    value: {
      status: false,
      paginated_results: [] as {
        pagination: PaginationType;
        data: UserT[];
        key: string;
      }[],
      data: [] as UserT[],
    },
  },
  reducers: {
    updateUsersList: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    addUsersToList: (state, action) => {
      const { data, pagination } = addToListReduxHelper(
        state.value,
        action?.payload
      );
      state.value.data = data;
      state.value.paginated_results = pagination;
    },
    addToPaginationHistory: (state, action) => {
      const { is_found, paginated_results } = addToPaginationHistoryReduxHelper(
        state.value,
        action?.payload
      );
      if (!is_found) {
        state.value.paginated_results = paginated_results;
      }
    },
    removeUsersInList: (state, action) => {
      const { id } = action?.payload;
      const { data, paginated_result } = removeItemFromStoreReduxHelper(
        state.value,
        id
      );
      state.value.data = data;
      state.value.paginated_results = paginated_result;
    },
    replaceUsersInList: (state, action) => {
      const { data, paginated_result } = replaceItemInStoreReduxHelper(
        state.value,
        action?.payload
      );
      state.value.data = data;
      state.value.paginated_results = paginated_result;
    },
    clearUsersList: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateUsersList,
  addUsersToList,
  addToPaginationHistory,
  removeUsersInList,
  replaceUsersInList,
  clearUsersList,
} = usersStoreData.actions;

export default usersStoreData.reducer;
