import { useCallback, useEffect, useState } from "react";
import type { UserAccount } from "../../../../types/api/service.types";
import useAxios from "../../../../config/services/axios-context";
import { ACCOUNT_NUMBER_MAX_LENGTH } from "../../../../config/system/constants";

export default function useValidateAccount(
  accountNumber: string,
  bankCode: string
) {
  const axios = useAxios();
  const [data, setData] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const validateAccount = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const response = await axios.get(
        `/accounts/validate-account?account_number=${accountNumber}&bank_code=${bankCode}`
      );
      const data = response?.data?.data;
      setData(data);
    } catch (error) {
      setIsFailed(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [accountNumber, bankCode]);

  useEffect(() => {
    if (accountNumber.length === ACCOUNT_NUMBER_MAX_LENGTH && bankCode) {
      validateAccount();
    } else {
      setData(null);
    }
  }, [accountNumber, bankCode]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: validateAccount,
  };
}
