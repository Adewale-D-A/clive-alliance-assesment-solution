import useAxios from "../../../../config/services/axios-context";
import { DEFAULT_PAGE_LIMIT } from "../../../../config/system/constants";
import {
  updateUsersList,
  addToPaginationHistory,
} from "../../../../stores/features/services/API/users/users";
import { useAppDispatch, useAppSelector } from "../../../../stores/store-hooks";
import type { PaginationType } from "../../../../types/types";
import queryParamsExtractor from "../../../../utils/api-query-params-extractor";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_OPTIONS = {
  page: 1,
  sort: "-created_at",
  search: "",
  start_date: "",
  end_date: "",
  limit: DEFAULT_PAGE_LIMIT,
  hospital_id: "",
  branch_id: "",
};
type OptionsType = Partial<typeof DEFAULT_OPTIONS>;
//axios instace interceptor for access token integration and refresh tokens
export default function useGetUsers(options: OptionsType = DEFAULT_OPTIONS) {
  const {
    limit,
    page,
    start_date,
    end_date,
    search,
    sort,
    hospital_id,
    branch_id,
  } = options;

  const axios = useAxios();
  const dispatch = useAppDispatch();
  const {
    status,
    data,
    paginated_results: store_pagination,
  } = useAppSelector((state) => state.usersStoreData.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const [pagination, setPagination] = useState<PaginationType>({} as any);

  const getUsers = useCallback(
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
          ordering: sort,
          search: search,
          page_size: limitless ? 1000 : Number(limit),
          hospital: hospital_id,
          branch: branch_id,
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
            dispatch(updateUsersList({ data: foundPage?.data }));
          }
          return foundPage?.data;
        } else {
          const response = await axios.get(`/users/all-users/?${queryString}`);
          const users = response?.data;
          const { results, count, next, previous } = users;
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
            length: results?.length,
          };
          if (!isExport) {
            dispatch(updateUsersList({ data: results ?? [] }));
            setPagination(paginationDataset);
          }
          dispatch(
            addToPaginationHistory({
              pagination: paginationDataset,
              data: results ?? [],
              key: queryKey,
            })
          );
          return results;
        }
      } catch (error) {
        setIsFailed(true);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [limit, page, start_date, end_date, search, sort, hospital_id, branch_id]
  );

  useEffect(() => {
    getUsers();
  }, [limit, page, start_date, end_date, search, sort, hospital_id, branch_id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getUsers,
    pagination,
  };
}
