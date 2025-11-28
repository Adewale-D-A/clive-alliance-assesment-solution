import type { PaginationType } from "../../types/types";

type DataType = any; // Replace with your actual Admin type
type PaginationItem = {
  pagination: PaginationType;
  data: DataType[];
  key: string;
};

type StateValue = {
  data: DataType[];
  paginated_results: PaginationItem[];
};

export function addToListReduxHelper(
  currentState: StateValue,
  newData: DataType
) {
  const updatedData = [newData, ...currentState?.data];

  // const lastIndex = currentState?.paginated_results?.length - 1;
  const updatedPagination = currentState?.paginated_results.map(
    (item, index) => {
      if (index === 0) {
        return {
          pagination: item?.pagination,
          data: [newData, ...item.data],
          key: item.key,
        };
      }
      return item;
    }
  );

  return {
    data: updatedData,
    pagination: updatedPagination,
  };
}

export function addToPaginationHistoryReduxHelper(
  currentState: StateValue,
  newData: PaginationItem
) {
  const found = currentState?.paginated_results?.find(
    (item) => item?.key === newData?.key
  );
  return {
    is_found: Boolean(found),
    paginated_results: [
      {
        pagination: newData?.pagination,
        data: newData?.data,
        key: newData?.key,
      },
      ...currentState.paginated_results,
    ],
  };
}

export function removeItemFromStoreReduxHelper(
  currentState: StateValue,
  id: string
) {
  const updatedData = [...currentState.data];
  const currentIndex = updatedData.findIndex(
    (v: { id: string }) => v.id === id
  );
  if (currentIndex >= 0) {
    updatedData.splice(currentIndex, 1);
  }
  //remove from paginated result data
  const newDataResult = currentState.paginated_results.map(
    ({ data, key, pagination }, index) => {
      return {
        pagination,
        data: data.filter((d, i) => {
          return !(d.id === id);
        }),
        key,
      };
    }
  );
  return {
    data: updatedData,
    paginated_result: newDataResult,
  };
}

export function replaceItemInStoreReduxHelper(
  currentState: StateValue,
  newData: DataType
) {
  const { id } = newData;
  const updatedData = [...currentState.data];
  const currentIndex = updatedData.findIndex(
    (v: { id: string }) => v.id === id
  );
  if (currentIndex >= 0) {
    updatedData.splice(currentIndex, 1, {
      ...updatedData[currentIndex],
      ...newData,
    });
  }
  //REPLACE pagination data
  const replacedResult = currentState.paginated_results.map(
    ({ pagination, data, key }, index) => {
      const replaced = data.map((data, i) => {
        if (String(data.id) === String(id)) {
          return { ...data, ...newData };
        }
        return data;
      });
      return {
        pagination,
        data: replaced,
        key,
      };
    }
  );

  return {
    data: updatedData,
    paginated_result: replacedResult,
  };
}
