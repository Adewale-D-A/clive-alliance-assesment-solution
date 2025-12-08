import { useCallback, useEffect, useState } from "react";
import type { TransactionT } from "../../../../types/api/service.types";
import useAxios from "../../../../config/services/axios-context";

export default function useGetATransaction(id?: string) {
  const axios = useAxios();
  const [data, setData] = useState<TransactionT | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getTransaction = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/transactions/${id}`);
      const data = response?.data?.data;
      setData(data);
    } catch (error) {
      setIsFailed(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getTransaction();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getTransaction,
  };
}
