"use client";
import { useEffect } from "react";
import axios from "axios";
import { openInfobar } from "../../stores/features/app-native-features/info-modal";
import { useAppDispatch } from "../../stores/store-hooks";
import extractToken from "../../utils/auth/extract-token-client";
import extractErrMssg from "../../utils/extract-error-msg";
import signOutClient from "../../utils/auth/sign-out-client";
import { useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

type OptionsType = {
  type?: "multipart" | "json";
  disableSuccMssg?: boolean;
  disableErrMssg?: boolean;
};
export default function useAxios(
  option: OptionsType = {
    type: "json",
    disableSuccMssg: true,
    disableErrMssg: false,
  }
) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { token } = extractToken();
  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers["Content-Type"] =
          option?.type === "multipart"
            ? "multipart/form-data"
            : "application/json";
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => {
        const message = response.data.message;
        if (!option?.disableSuccMssg) {
          dispatch(
            openInfobar({
              isError: false,
              render: "SuccessPrompt",
              message: message ?? "Success",
            })
          );
        }
        return response;
      },
      async (error) => {
        const errMssg = extractErrMssg(error?.response);
        if (error?.response?.status === 401) {
          signOutClient(location?.pathname);
        }
        if (!option?.disableErrMssg) {
          dispatch(
            openInfobar({
              isError: true,
              render: "ErrorPrompt",
              message: errMssg,
            })
          );
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [token]);
  return axiosInstance;
}
