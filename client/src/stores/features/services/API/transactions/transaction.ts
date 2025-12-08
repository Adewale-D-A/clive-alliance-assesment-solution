import type { TransactionT } from "../../../../../types/api/service.types";
import type { PaginationType } from "../../../../../types/types";
import {
  addToListReduxHelper,
  addToPaginationHistoryReduxHelper,
  removeItemFromStoreReduxHelper,
  replaceItemInStoreReduxHelper,
} from "../../../../../utils/redux-store-helper";
import { createSlice } from "@reduxjs/toolkit";

export const transactionsStoreData = createSlice({
  name: "transactions",
  initialState: {
    value: {
      status: false,
      paginated_results: [] as {
        pagination: PaginationType;
        data: TransactionT[];
        key: string;
      }[],
      data: [] as TransactionT[],
    },
  },
  reducers: {
    updateTransactionsList: (state, action) => {
      state.value.status = true;
      state.value.data = action?.payload?.data;
    },
    addTransactionToList: (state, action) => {
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
    removeTransactionInList: (state, action) => {
      const { id } = action?.payload;
      const { data, paginated_result } = removeItemFromStoreReduxHelper(
        state.value,
        id
      );
      state.value.data = data;
      state.value.paginated_results = paginated_result;
    },
    replaceTransactionInList: (state, action) => {
      const { data, paginated_result } = replaceItemInStoreReduxHelper(
        state.value,
        action?.payload
      );
      state.value.data = data;
      state.value.paginated_results = paginated_result;
    },
    clearTransactionsList: (state) => {
      state.value.status = false;
      state.value.data = [];
    },
  },
});

export const {
  updateTransactionsList,
  addTransactionToList,
  addToPaginationHistory,
  removeTransactionInList,
  replaceTransactionInList,
  clearTransactionsList,
} = transactionsStoreData.actions;

export default transactionsStoreData.reducer;
