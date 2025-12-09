import { useCallback, useEffect, useState } from "react";
import type { AuthUserAccount } from "../../../../types/api/service.types";
import useAxios from "../../../../config/services/axios-context";
import { useAppSelector } from "../../../../stores/store-hooks";

export default function useGetMyAccount() {
  const axios = useAxios();
  const { data: transactions } = useAppSelector(
    (state) => state.transactionsStoreData.value
  );
  const { user } = useAppSelector((state) => state.auth.value);
  const [data, setData] = useState<AuthUserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getAccount = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/accounts/auth-user/${user.id}/`);
      const data = response?.data?.data;
      setData(data);
    } catch (error) {
      setIsFailed(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user.id) {
      getAccount();
    }
  }, [user, transactions]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAccount,
  };
}
