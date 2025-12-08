import { useCallback, useEffect, useState } from "react";
import type { UserAccount } from "../../../../types/api/service.types";
import useAxios from "../../../../config/services/axios-context";
import { ACCOUNT_NUMBER_MAX_LENGTH } from "../../../../config/system/constants";

export default function useValidateAccount(accountNumber: string) {
  const axios = useAxios();
  const [data, setData] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const validateAccount = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      //   const response = await axios.get(`/users/all-users/${accountNumber}/`);
      //   const data = response?.data;
      setData({
        user: {
          id: "u12345",
          username: "azeez01",
          first_name: "Azeez",
          last_name: "Olawale",
          email: "azeez.olawale@example.com",
          phone_number: "+2348012345678",
          dob: "1995-07-15",
          gender: "male",
        },
        account_number: 9876543210,
        account_name: "Azeez Olawale",
      });
    } catch (error) {
      setIsFailed(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [accountNumber]);

  useEffect(() => {
    if (accountNumber.length === ACCOUNT_NUMBER_MAX_LENGTH) {
      validateAccount();
    } else {
      setData(null);
    }
  }, [accountNumber]);

  return {
    data,
    isLoading,
    isFailed,
    setIsFailed,
    retryFunction: validateAccount,
  };
}
