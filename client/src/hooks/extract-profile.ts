"use client";
import { useCallback, useEffect, useState } from "react";
import extractProfileClient from "../utils/auth/extract-profile-client";
// import extractTokenClient from "../../utils/auth/extract-token-client";
import { useAppDispatch, useAppSelector } from "../stores/store-hooks";
import { updateUser } from "../stores/features/auth/auth";

//axios instace interceptor for access token integration and refresh tokens
export default function useExtractProfile() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth.value);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const getExtractProfile = useCallback(async () => {
    setIsLoading(true);
    setIsFailed(false);
    try {
      const user = extractProfileClient();

      dispatch(
        updateUser({
          user: {
            ...user,
          },
        })
      );
    } catch (error) {
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) {
      getExtractProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  return {
    data: user,
    isLoading,
    isFailed,
    setIsFailed,
    retry: getExtractProfile,
  };
}
