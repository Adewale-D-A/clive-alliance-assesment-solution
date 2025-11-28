import { useCallback, useEffect, useState } from "react";
import type { UserT } from "../../../../types/api/service.types";
import useAxios from "../../../../config/services/axios-context";

export default function useGetAUser(id?: string) {
  const axios = useAxios();
  const [data, setData] = useState<UserT | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const getUser = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(`/users/all-users/${id}/`);
      const data = response?.data;
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
      getUser();
    }
  }, [id]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: getUser,
  };
}
