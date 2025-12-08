import { useCallback, useEffect, useState } from "react";
import type { AuthUserAccount } from "../../../../types/api/service.types";
import useAxios from "../../../../config/services/axios-context";

export default function useGetMyAccount() {
  const axios = useAxios();
  const [data, setData] = useState<AuthUserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const authUser = {
    id: "random",
  };
  const getAccount = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/accounts/${authUser.id}/`);
      const data = response?.data?.data;
      setData(data);
    } catch (error) {
      setIsFailed(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAccount();
  }, []);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getAccount,
  };
}
