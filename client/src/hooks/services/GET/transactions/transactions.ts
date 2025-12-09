import useAxios from "../../../../config/services/axios-context";
import { DEFAULT_PAGE_LIMIT } from "../../../../config/system/constants";
import {
  updateTransactionsList,
  addToPaginationHistory,
} from "../../../../stores/features/services/API/transactions/transaction";
import { useAppDispatch, useAppSelector } from "../../../../stores/store-hooks";
import type { PaginationType } from "../../../../types/types";
import queryParamsExtractor from "../../../../utils/api-query-params-extractor";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_OPTIONS = {
  page: 1,
  sort: "asc",
  search: "",
  start_date: "",
  end_date: "",
  limit: DEFAULT_PAGE_LIMIT,
};
type OptionsType = Partial<typeof DEFAULT_OPTIONS>;
//axios instace interceptor for access token integration and refresh tokens
export default function useGetTransactions(
  options: OptionsType = DEFAULT_OPTIONS
) {
  const { limit, page, start_date, end_date, search, sort } = options;

  const axios = useAxios();
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    paginated_results: store_pagination,
  } = useAppSelector((state) => state.transactionsStoreData.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<PaginationType>({} as any);

  const getTransactions = useCallback(
    async (skipCache?: boolean, limitless?: number, isExport?: boolean) => {
      if (!isExport) {
        setIsLoading(true);
        setIsFailed(false);
      }
      try {
        const queryDataset = {
          page: page,
          start_date,
          end_date,
          sort: sort === "asc" ? "1" : "0",
          search: search,
          limit: limitless ? 1000 : Number(limit),
        };
        const queryKey = JSON.stringify(queryDataset);
        const { queryString } = queryParamsExtractor({
          dataset: queryDataset,
        });
        //check store if this requested data has been saved previously and retirve it
        //if not, make a new request and save into store
        const foundPage = store_pagination.find(
          (item) => item?.key === queryKey
        );
        if (foundPage && !skipCache) {
          if (!isExport) {
            setPagination(foundPage?.pagination);
            dispatch(updateTransactionsList({ data: foundPage?.data }));
          }
          return foundPage?.data;
        } else {
          const response = await axios.get(`/transactions?${queryString}`);
          const transactionResponse = response?.data?.data;
          const { data, count } = transactionResponse;
          // const params = extractQueryString(next)
          const pageCount = Math.ceil(
            Number(count ?? 1) / (Number(limit) ?? DEFAULT_PAGE_LIMIT)
          );
          const paginationDataset = {
            current_page: Number(page) ?? 1,
            last_page: pageCount,
            per_page: Number(limit) ?? 1,
            total: Number(count),
            from: 1,
            to: 1,
            length: data?.length,
          };
          if (!isExport) {
            dispatch(updateTransactionsList({ data: data ?? [] }));
            setPagination(paginationDataset);
          }
          dispatch(
            addToPaginationHistory({
              pagination: paginationDataset,
              data: data ?? [],
              key: queryKey,
            })
          );
          return [];
        }
      } catch (error) {
        setIsFailed(true);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [limit, page, start_date, end_date, search, sort]
  );

  useEffect(() => {
    getTransactions();
  }, [limit, page, start_date, end_date, search, sort]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getTransactions,
    pagination,
  };
}
